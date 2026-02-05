import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const IMG_FORMAT = "JPEG";
const IMG_QUALITY = 0.62;
const H2C_SCALE = 1.1;
const MAX_CANVAS_WIDTH_PX = 1600;

// Track export state
let isExporting = false;
let exportTimeoutIds = [];

// Clear all timeouts to prevent memory leaks
function clearAllTimeouts() {
  exportTimeoutIds.forEach((id) => clearTimeout(id));
  exportTimeoutIds = [];
}

// Wrap setTimeout to track all timeouts
function safeSetTimeout(fn, delay) {
  const id = setTimeout(() => {
    fn();
    // Remove from tracking after execution
    exportTimeoutIds = exportTimeoutIds.filter((timeoutId) => timeoutId !== id);
  }, delay);
  exportTimeoutIds.push(id);
  return id;
}

function downscaleCanvas(srcCanvas, maxWidthPx = MAX_CANVAS_WIDTH_PX) {
  if (!srcCanvas || !srcCanvas.width || srcCanvas.width <= maxWidthPx)
    return srcCanvas;
  const ratio = maxWidthPx / srcCanvas.width;
  const targetW = Math.round(srcCanvas.width * ratio);
  const targetH = Math.round(srcCanvas.height * ratio);
  const dst = document.createElement("canvas");
  dst.width = targetW;
  dst.height = targetH;
  const ctx = dst.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    srcCanvas,
    0,
    0,
    srcCanvas.width,
    srcCanvas.height,
    0,
    0,
    targetW,
    targetH
  );
  return dst;
}

function waitForImages(rootEl, timeoutMs = 8000) {
  const imgs = Array.from(rootEl.querySelectorAll("img"));
  if (imgs.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let done = false;
    const timer = safeSetTimeout(() => {
      if (!done) {
        done = true;
        resolve();
      }
    }, timeoutMs);

    let remaining = 0;
    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) return;
      remaining += 1;
      const cleanup = () => {
        if (done) return;
        remaining -= 1;
        if (remaining <= 0) {
          done = true;
          clearTimeout(timer);
          resolve();
        }
      };
      img.addEventListener("load", cleanup, { once: true });
      img.addEventListener("error", cleanup, { once: true });
    });

    if (remaining === 0) {
      done = true;
      clearTimeout(timer);
      resolve();
    }
  });
}

async function waitForStableSections({ timeoutMs = 6000, idleMs = 250 } = {}) {
  const start = Date.now();
  const getCount = () => document.querySelectorAll(".pdf-section").length;

  if (getCount() === 0) {
    await new Promise((r) => {
      requestAnimationFrame(() => requestAnimationFrame(r));
    });
  }

  return new Promise((resolve) => {
    let lastCount = getCount();
    let idleTimer = null;

    const done = () => {
      observer.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      resolve();
    };

    const resetIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = safeSetTimeout(() => done(), idleMs);
    };

    const observer = new MutationObserver(() => {
      const now = Date.now();
      if (now - start > timeoutMs) {
        return done();
      }
      const current = getCount();
      if (current !== lastCount) {
        lastCount = current;
        resetIdle();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    resetIdle();
  });
}

async function addCanvasToPdf(pdf, canvas, marginMm = 0) {
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const processedCanvas = downscaleCanvas(canvas, MAX_CANVAS_WIDTH_PX);

  const usableW = pageW - marginMm * 2;
  const usableH = pageH - marginMm * 2;

  const imgHByWidth =
    (processedCanvas.height * usableW) / processedCanvas.width;

  if (imgHByWidth <= usableH) {
    const imgData = processedCanvas.toDataURL("image/jpeg", IMG_QUALITY);
    pdf.addImage(imgData, IMG_FORMAT, marginMm, marginMm, usableW, imgHByWidth);
    return;
  }

  const APPROX_SECTION_PX = 900;
  const TOLERANCE_PX = 40;
  if (processedCanvas.height <= APPROX_SECTION_PX + TOLERANCE_PX) {
    const targetH = usableH;
    const targetW = (processedCanvas.width * targetH) / processedCanvas.height;
    const x = marginMm + Math.max(0, (usableW - targetW) / 2);
    const imgData = processedCanvas.toDataURL("image/jpeg", IMG_QUALITY);
    pdf.addImage(imgData, IMG_FORMAT, x, marginMm, targetW, targetH);
    return;
  }

  const pxPerMm = processedCanvas.width / usableW;
  const sliceHeightPx = Math.floor(usableH * pxPerMm);

  let yPx = 0;
  while (yPx < processedCanvas.height) {
    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = processedCanvas.width;
    sliceCanvas.height = Math.min(sliceHeightPx, processedCanvas.height - yPx);

    const ctx = sliceCanvas.getContext("2d");
    ctx.drawImage(
      processedCanvas,
      0,
      yPx,
      processedCanvas.width,
      sliceCanvas.height,
      0,
      0,
      processedCanvas.width,
      sliceCanvas.height
    );

    const sliceImgData = sliceCanvas.toDataURL("image/jpeg", IMG_QUALITY);
    const sliceImgH = (sliceCanvas.height * usableW) / sliceCanvas.width;

    pdf.addImage(
      sliceImgData,
      IMG_FORMAT,
      marginMm,
      marginMm,
      usableW,
      sliceImgH
    );

    yPx += sliceHeightPx;
    if (yPx < processedCanvas.height) pdf.addPage();
  }
}

async function preloadImagesForSections(sections, timeoutMs = 6000) {
  const urls = new Set();
  sections.forEach((sec) => {
    sec.querySelectorAll("img").forEach((img) => {
      if (img?.src) urls.add(img.src);
    });
  });

  if (urls.size === 0) return;

  await Promise.race([
    Promise.all(
      Array.from(urls).map(
        (src) =>
          new Promise((resolve) => {
            const im = new Image();
            im.onload = im.onerror = () => resolve();
            im.crossOrigin = "anonymous";
            im.src = src;
          })
      )
    ),
    new Promise((r) => safeSetTimeout(r, timeoutMs)),
  ]);
}

function injectExportOptimizations() {
  const id = "pdf-export-optimizations";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    * { animation: none !important; transition: none !important; }
    .section-page { box-shadow: none !important; filter: none !important; }
    .content-page, .content-page * { text-shadow: none !important; }
  `;
  document.head.appendChild(style);
}

function removeExportOptimizations() {
  const node = document.getElementById("pdf-export-optimizations");
  if (node && node.parentNode) node.parentNode.removeChild(node);
}

// Inject loader styles properly
function injectLoaderStyles() {
  const id = "pdf-loader-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @keyframes loaderSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .pdf-exporting * {
      animation-play-state: running !important;
    }
    
    #pdf-export-loader .loader-container {
      animation: fadeIn 0.3s ease-out !important;
    }
    
    #pdf-export-loader .loader-spinner {
      animation: loaderSpin 1s linear infinite !important;
      animation-play-state: running !important;
    }
    
    /* Force animations to run even in background tabs */
    @media (prefers-reduced-motion: no-preference) {
      #pdf-export-loader .loader-spinner {
        animation-duration: 1s !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function removeLoaderStyles() {
  const node = document.getElementById("pdf-loader-styles");
  if (node && node.parentNode) node.parentNode.removeChild(node);
}

// Request animation frame with fallback for background tabs
function forceAnimationFrame() {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      if (Date.now() - start > 50) {
        resolve(); // Fallback after 50ms
        return;
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    };
    check();
  });
}

export async function downloadPdfSplitByHeader() {
  if (isExporting) {
    console.warn("Export already in progress");
    return;
  }

  try {
    isExporting = true;
    clearAllTimeouts();

    // Ensure animations can run in background tabs
    if (document.documentElement) {
      document.documentElement.style.setProperty(
        "animation-play-state",
        "running",
        "important"
      );
      document.documentElement.style.setProperty(
        "transition-play-state",
        "running",
        "important"
      );
    }

    // Wait for fonts
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn("Font loading failed:", e);
      }
    }

    // Force double animation frame for stable render
    await forceAnimationFrame();

    // Wait for sections to be stable
    await waitForStableSections({ timeoutMs: 8000, idleMs: 300 });

    let sections = Array.from(document.querySelectorAll(".pdf-section"));
    if (!sections.length) {
      isExporting = false;
      return;
    }

    // Show loader and inject styles BEFORE any heavy operations
    showLoader("Exporting PDF…", sections.length);
    injectExportOptimizations();
    injectLoaderStyles();

    // Force animation to start
    await forceAnimationFrame();

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Final stability check and image prefetch
    await waitForStableSections({ timeoutMs: 4000, idleMs: 250 });
    sections = Array.from(document.querySelectorAll(".pdf-section"));
    await preloadImagesForSections(sections, 5000);

    for (let i = 0; i < sections.length; i++) {
      // Check if export was cancelled
      if (!isExporting) {
        console.log("Export cancelled");
        break;
      }

      const el = sections[i];

      // Update loader progress
      updateLoaderProgress(i + 1, sections.length);

      if (!el || !el.isConnected || !document.body.contains(el)) {
        console.warn("Skipping section: element not in DOM at capture time");
        continue;
      }

      try {
        await waitForImages(el, 5000);

        // Force render before capturing
        await forceAnimationFrame();

        // Use webgl rendering for better performance
        const canvas = await html2canvas(el, {
          scale: H2C_SCALE,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
          removeContainer: true,
          logging: false,
          allowTaint: true,
          imageTimeout: 0,
          ignoreElements: (element) => {
            return element.id === "pdf-export-loader";
          },
          onclone: (clonedDoc, element) => {
            // Remove loader from cloned document
            const loader = clonedDoc.getElementById("pdf-export-loader");
            if (loader && loader.parentNode) {
              loader.parentNode.removeChild(loader);
            }

            // Ensure visibility
            element.style.visibility = "visible";
            element.style.opacity = "1";
          },
        });

        if (!canvas || canvas.width === 0 || canvas.height === 0) {
          throw new Error("Empty canvas");
        }

        await addCanvasToPdf(pdf, canvas, 0.1);
        if (i < sections.length - 1) pdf.addPage();
      } catch (firstErr) {
        console.warn("First capture attempt failed:", firstErr);
        try {
          // Fallback attempt with different settings
          await forceAnimationFrame();

          const canvas = await html2canvas(el, {
            scale: Math.max(0.95, H2C_SCALE - 0.1),
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
            removeContainer: true,
            foreignObjectRendering: false,
            logging: false,
            allowTaint: true,
            imageTimeout: 0,
            ignoreElements: (element) => element.id === "pdf-export-loader",
            onclone: (clonedDoc) => {
              const loader = clonedDoc.getElementById("pdf-export-loader");
              if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
              }
            },
          });

          await addCanvasToPdf(pdf, canvas, 0.1);
          if (i < sections.length - 1) pdf.addPage();
        } catch (secondErr) {
          console.warn("Second capture attempt failed:", secondErr);
          try {
            // Minimal fallback
            await forceAnimationFrame();

            const canvas = await html2canvas(el, {
              scale: 0.9,
              useCORS: false,
              backgroundColor: "#ffffff",
              scrollX: 0,
              scrollY: 0,
              removeContainer: true,
              foreignObjectRendering: true,
              logging: false,
              allowTaint: false,
              imageTimeout: 0,
              ignoreElements: (element) => element.id === "pdf-export-loader",
              onclone: (clonedDoc) => {
                const loader = clonedDoc.getElementById("pdf-export-loader");
                if (loader && loader.parentNode) {
                  loader.parentNode.removeChild(loader);
                }
              },
            });

            await addCanvasToPdf(pdf, canvas, 0.1);
            if (i < sections.length - 1) pdf.addPage();
          } catch (finalErr) {
            console.error(
              "All capture attempts failed for section",
              i,
              finalErr
            );
            continue;
          }
        }
      }

      // Yield to browser every few sections to keep UI responsive
      if (i % 3 === 0) {
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    if (isExporting) {
      pdf.save("report.pdf");
    }
  } catch (err) {
    console.error("Failed to generate PDF:", err);
    // Show error to user
    if (isExporting) {
      const loader = document.getElementById("pdf-export-loader");
      if (loader) {
        const message = loader.querySelector(".loader-message");
        if (message) {
          message.textContent = "Export failed. Please try again.";
          message.style.color = "#dc2626";
        }
        safeSetTimeout(hideLoader, 3000);
      }
    }
  } finally {
    // Cleanup
    removeExportOptimizations();
    removeLoaderStyles();
    clearAllTimeouts();

    // Reset animation states
    if (document.documentElement) {
      document.documentElement.style.removeProperty("animation-play-state");
      document.documentElement.style.removeProperty("transition-play-state");
    }

    // Hide loader with delay to ensure clean state
    safeSetTimeout(() => {
      hideLoader();
      isExporting = false;
    }, 100);
  }
}

export function cancelPdfExport() {
  if (isExporting) {
    console.log("Cancelling PDF export...");
    isExporting = false;
    clearAllTimeouts();

    // Show cancelled message briefly
    const loader = document.getElementById("pdf-export-loader");
    if (loader) {
      const message = loader.querySelector(".loader-message");
      if (message) {
        message.textContent = "Export cancelled";
        message.style.color = "#6b7280";
      }
    }

    safeSetTimeout(() => {
      hideLoader();
      removeExportOptimizations();
      removeLoaderStyles();
    }, 800);
  }
}

export { addCanvasToPdf };

// FIXED: Proper loader animation implementation
function showLoader(message = "Preparing PDF…", totalPages = 0) {
  // Remove existing loader first
  const existing = document.getElementById("pdf-export-loader");
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }

  // Remove existing styles
  const existingStyles = document.getElementById("pdf-loader-styles");
  if (existingStyles && existingStyles.parentNode) {
    existingStyles.parentNode.removeChild(existingStyles);
  }

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "pdf-export-loader";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, sans-serif;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // Create loader content
  const loaderContainer = document.createElement("div");
  loaderContainer.className = "loader-container";
  loaderContainer.style.cssText = `
    background: #ffffff;
    border-radius: 16px;
    padding: 32px 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    text-align: center;
    min-width: 320px;
    max-width: 90vw;
    border: 1px solid rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateY(10px);
  `;

  // Create spinner
  const spinner = document.createElement("div");
  spinner.className = "loader-spinner";
  spinner.style.cssText = `
    width: 60px;
    height: 60px;
    border: 4px solid rgba(243, 244, 246, 1);
    border-top: 4px solid rgba(37, 99, 235, 1);
    border-radius: 50%;
    margin: 0 auto 24px;
  `;

  // Create message
  const messageDiv = document.createElement("div");
  messageDiv.className = "loader-message";
  messageDiv.style.cssText = `
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 8px;
    line-height: 1.4;
  `;
  messageDiv.textContent = message;

  // Create progress text
  const progressText = document.createElement("div");
  progressText.className = "loader-progress-text";
  progressText.style.cssText = `
    font-size: 14px;
    color: #6b7280;
    margin-bottom: ${totalPages > 0 ? "16px" : "0"};
  `;
  if (totalPages > 0) {
    progressText.textContent = `0/${totalPages} pages`;
  }

  // Assemble loader
  loaderContainer.appendChild(spinner);
  loaderContainer.appendChild(messageDiv);
  loaderContainer.appendChild(progressText);

  // Add progress bar if needed
  if (totalPages > 0) {
    const progressBarContainer = document.createElement("div");
    progressBarContainer.className = "loader-progress-bar-container";
    progressBarContainer.style.cssText = `
      background: #f3f4f6;
      border-radius: 8px;
      height: 8px;
      overflow: hidden;
      margin-bottom: 12px;
    `;

    const progressBar = document.createElement("div");
    progressBar.className = "loader-progress-bar";
    progressBar.style.cssText = `
      background: #2563eb;
      height: 100%;
      width: 0%;
      border-radius: 8px;
      transition: width 0.3s ease;
    `;

    progressBarContainer.appendChild(progressBar);
    loaderContainer.appendChild(progressBarContainer);

    const percentageDiv = document.createElement("div");
    percentageDiv.className = "loader-percentage";
    percentageDiv.style.cssText = `
      font-size: 13px;
      color: #9ca3af;
      font-weight: 500;
    `;
    percentageDiv.textContent = "0%";
    loaderContainer.appendChild(percentageDiv);
  }

  // Add cancel button
  const cancelButton = document.createElement("button");
  cancelButton.id = "pdf-export-cancel";
  cancelButton.textContent = "Cancel Export";
  cancelButton.style.cssText = `
    margin-top: 20px;
    padding: 8px 16px;
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  `;
  cancelButton.addEventListener("mouseenter", () => {
    cancelButton.style.background = "#e5e7eb";
  });
  cancelButton.addEventListener("mouseleave", () => {
    cancelButton.style.background = "#f3f4f6";
  });
  cancelButton.addEventListener("click", cancelPdfExport);
  loaderContainer.appendChild(cancelButton);

  overlay.appendChild(loaderContainer);
  document.body.appendChild(overlay);

  // Force styles injection
  injectLoaderStyles();

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      loaderContainer.style.opacity = "1";
      loaderContainer.style.transform = "translateY(0)";
      loaderContainer.style.transition =
        "opacity 0.3s ease, transform 0.3s ease";

      // Force spinner animation
      spinner.style.animation = "loaderSpin 1s linear infinite";
    });
  });

  document.body.classList.add("pdf-exporting");
}

function updateLoaderProgress(currentPage, totalPages) {
  if (totalPages <= 0) return;

  const loader = document.getElementById("pdf-export-loader");
  if (!loader) return;

  const progressText = loader.querySelector(".loader-progress-text");
  if (progressText) {
    progressText.textContent = `${currentPage}/${totalPages} pages`;
  }

  const progressBar = loader.querySelector(".loader-progress-bar");
  if (progressBar) {
    const percentage = Math.round((currentPage / totalPages) * 100);
    progressBar.style.width = `${percentage}%`;
  }

  const percentageEl = loader.querySelector(".loader-percentage");
  if (percentageEl) {
    const percentage = Math.round((currentPage / totalPages) * 100);
    percentageEl.textContent = `${percentage}%`;
  }
}

function hideLoader() {
  const loader = document.getElementById("pdf-export-loader");
  if (loader) {
    // Fade out animation
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.3s ease";

    safeSetTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
      document.body.classList.remove("pdf-exporting");
    }, 300);
  }
}
