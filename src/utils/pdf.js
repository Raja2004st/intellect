import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const IMG_FORMAT = "JPEG";
const IMG_QUALITY = 0.68;
const H2C_SCALE = 1.3;
const MAX_CANVAS_WIDTH_PX = 1800; // Downscale very large canvases to cap size

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
  let done = false;
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      if (!done) resolve();
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

async function waitForStableSections({ timeoutMs = 8000, idleMs = 300 } = {}) {
  const start = Date.now();
  const getCount = () => document.querySelectorAll(".pdf-section").length;

  if (getCount() === 0) {
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );
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
      idleTimer = setTimeout(() => done(), idleMs);
    };

    const observer = new MutationObserver(() => {
      const now = Date.now();
      if (now - start > timeoutMs) return done();
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

export async function downloadPdfSplitByHeader() {
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready.catch(() => {});
    }
  } catch {}
  await new Promise((r) =>
    requestAnimationFrame(() => requestAnimationFrame(r))
  );

  await waitForStableSections({ timeoutMs: 12000, idleMs: 350 });

  let sections = Array.from(document.querySelectorAll(".pdf-section"));
  if (!sections.length) return;

  showLoader("Exporting PDF…", sections.length);

  try {
    // Enable stream compression in jsPDF constructor
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    await waitForStableSections({ timeoutMs: 12000, idleMs: 350 });
    sections = Array.from(document.querySelectorAll(".pdf-section"));

    for (let i = 0; i < sections.length; i++) {
      const el = sections[i];

      // Update loader with current progress
      updateLoaderProgress(i + 1, sections.length);

      if (!el || !el.isConnected || !document.body.contains(el)) {
        console.warn("Skipping section: element not in DOM at capture time");
        continue;
      }

      try {
        await waitForImages(el);
        await new Promise((r) => requestAnimationFrame(r));

        let canvas;
        try {
          canvas = await html2canvas(el, {
            scale: H2C_SCALE,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
            removeContainer: true,
            onclone: (clonedDoc) => {
              const loader = clonedDoc.getElementById("pdf-export-loader");
              if (loader && loader.parentNode)
                loader.parentNode.removeChild(loader);
            },
          });
        } catch (e1) {
          console.warn(
            `Retrying page ${i + 1} at lower scale/FO due to error`,
            e1
          );
          canvas = await html2canvas(el, {
            scale: 1,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
            removeContainer: true,
            foreignObjectRendering: true,
            onclone: (clonedDoc) => {
              const loader = clonedDoc.getElementById("pdf-export-loader");
              if (loader && loader.parentNode)
                loader.parentNode.removeChild(loader);
            },
          });
        }

        await addCanvasToPdf(pdf, canvas, 0.1);

        if (i < sections.length - 1) pdf.addPage();
      } catch (sectionErr) {
        console.warn("Skipping section due to render error:", sectionErr);
      }
    }

    pdf.save("report.pdf");
  } catch (err) {
    console.error("Failed to generate PDF:", err);
  } finally {
    hideLoader();
  }
}

export { addCanvasToPdf };

function showLoader(message = "Preparing PDF…", totalPages = 0) {
  const existing = document.getElementById("pdf-export-loader");
  if (existing) {
    const msgEl = existing.querySelector(".loader-message");
    if (msgEl) msgEl.textContent = message;

    const progressText = existing.querySelector(".loader-progress-text");
    if (progressText && totalPages > 0) {
      progressText.textContent = `0/${totalPages} pages`;
    }

    existing.style.display = "flex";
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "pdf-export-loader";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(8px);
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, sans-serif;
  `;

  overlay.innerHTML = `
    <div class="loader-container" style="
      background: #ffffff;
      border-radius: 16px;
      padding: 32px 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
      text-align: center;
      min-width: 320px;
      max-width: 90vw;
      border: 1px solid rgba(0, 0, 0, 0.08);
    ">
      <!-- Spinner -->
      <div class="loader-spinner" style="
        width: 60px;
        height: 60px;
        border: 4px solid #f3f4f6;
        border-top: 4px solid #2563eb;
        border-radius: 50%;
        margin: 0 auto 24px;
        animation: loader-spin 1s linear infinite;
      "></div>
      
      <!-- Message -->
      <div class="loader-message" style="
        font-size: 18px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 8px;
        line-height: 1.4;
      ">
        ${message}
      </div>
      
      <!-- Progress Text -->
      <div class="loader-progress-text" style="
        font-size: 14px;
        color: #6b7280;
        margin-bottom: ${totalPages > 0 ? "16px" : "0"};
      ">
        ${totalPages > 0 ? `0/${totalPages} pages` : ""}
      </div>
      
      <!-- Progress Bar (only shown when totalPages > 0) -->
      ${
        totalPages > 0
          ? `
        <div class="loader-progress-bar-container" style="
          background: #f3f4f6;
          border-radius: 8px;
          height: 8px;
          overflow: hidden;
          margin-bottom: 12px;
        ">
          <div class="loader-progress-bar" style="
            background: #2563eb;
            height: 100%;
            width: 0%;
            border-radius: 8px;
            transition: width 0.3s ease;
          "></div>
        </div>
        
        <!-- Percentage -->
        <div class="loader-percentage" style="
          font-size: 13px;
          color: #9ca3af;
          font-weight: 500;
        ">
          0%
        </div>
      `
          : ""
      }
      
      
    <style>
      @keyframes loader-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      #pdf-export-loader .loader-container {
        animation: fadeIn 0.3s ease-out;
      }
    </style>
  `;

  document.body.appendChild(overlay);
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
  const el = document.getElementById("pdf-export-loader");
  if (el && el.parentNode) {
    el.style.transition = "opacity 0.3s ease";
    el.style.opacity = "0";

    setTimeout(() => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 300);
  }
}
