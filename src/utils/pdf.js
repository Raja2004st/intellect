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

// Wait for images inside a container to load (with a timeout safeguard)
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

  showLoader("Exporting PDF…");

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

function showLoader(message = "Loading…") {
  const existing = document.getElementById("pdf-export-loader");
  if (existing) {
    const msgEl = existing.querySelector(".msg");
    if (msgEl) msgEl.textContent = message;
    existing.style.display = "flex";
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "pdf-export-loader";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "background:rgba(17,24,39,0.35)",
    "z-index:2147483646",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "pointer-events:none",
    "backdrop-filter:blur(2px)",
  ].join(";");

  overlay.innerHTML = `
    <style>
      @keyframes loader-bounce { 0%, 80%, 100% { transform: scale(0); opacity:.5 } 40% { transform: scale(1); opacity:1 } }
      .loader-card { display:flex; flex-direction:column; align-items:center; gap:12px; padding:18px 22px; border-radius:12px; background:#ffffff; box-shadow:0 10px 30px rgba(0,0,0,.16), 0 2px 8px rgba(0,0,0,.06); color:#111827; font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif; border:1px solid rgba(0,0,0,0.06); }
      .loader-row { display:flex; align-items:center; gap:10px; height:24px; }
      .dot { width:10px; height:10px; border-radius:50%; background:#2563eb; animation: loader-bounce 1.4s infinite ease-in-out both; }
      .dot:nth-child(1) { animation-delay:-0.32s; }
      .dot:nth-child(2) { animation-delay:-0.16s; }
      .msg { font-weight:600; font-size:14px; color:#0f172a; }
    </style>
    <div class="loader-card">
      <div class="loader-row" aria-hidden="true">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="msg">${message}</div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function hideLoader() {
  const el = document.getElementById("pdf-export-loader");
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

// export async function downloadDocxSplitByHeader() {
//   const sections = Array.from(document.querySelectorAll(".pdf-section"));
//   if (!sections.length) return;

//   // showLoader("Exporting Word…");
//   try {
//     const doc = new Document({
//       sections: [],
//     });

//     for (let i = 0; i < sections.length; i++) {
//       const el = sections[i];

//       const canvas = await html2canvas(el, {
//         scale: H2C_SCALE,
//         useCORS: true,
//         backgroundColor: "#ffffff", // force white background for consistent compression
//         scrollY: -window.scrollY,
//         // Ensure the loader is not included in the cloned DOM used by html2canvas
//         onclone: (clonedDoc) => {
//           const loader = clonedDoc.getElementById("pdf-export-loader");
//           if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
//         },
//       });

//       const blob = await new Promise((resolve) =>
//         canvas.toBlob(resolve, "image/jpeg", 0.72)
//       );
//       if (!blob) continue;
//       const imgBuffer = await blob.arrayBuffer();

//       const targetWidthPx = 700; // slightly less to keep margins and reduce size
//       const targetHeightPx = Math.round(
//         (canvas.height * targetWidthPx) / canvas.width
//       );

//       doc.addSection({
//         children: [
//           new Paragraph({
//             children: [
//               new ImageRun({
//                 data: imgBuffer,
//                 transformation: {
//                   width: targetWidthPx,
//                   height: targetHeightPx,
//                 },
//               }),
//             ],
//           }),
//         ],
//       });
//     }

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "report.docx");

//     // } finally {
//     //   hideLoader();
//     // }
//   } catch (e) {
//     console.error(e);
//   }
// }
