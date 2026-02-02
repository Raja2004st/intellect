import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Image compression and capture settings
const IMG_FORMAT = "JPEG"; // Use JPEG to significantly reduce size vs PNG
const IMG_QUALITY = 0.68; // 0..1, tune for quality vs size
const H2C_SCALE = 1.3; // Lower scale to reduce canvas pixel count
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

async function addCanvasToPdf(pdf, canvas, marginMm = 0) {
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  // Downscale canvas if too large to keep PDF size reasonable
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

  const APPROX_SECTION_PX = 900; // Fixed section height
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
  const sections = Array.from(document.querySelectorAll(".pdf-section"));
  if (!sections.length) return;

  // Show loader while generating the PDF
  showLoader("Exporting PDF…");

  try {
    // Enable stream compression in jsPDF constructor
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    for (let i = 0; i < sections.length; i++) {
      const el = sections[i];

      // Skip if element is not attached to the DOM
      if (!el || !el.isConnected || !document.body.contains(el)) {
        console.warn("Skipping section: element not in DOM at capture time");
        continue;
      }

      try {
        // Give layout a frame to settle before capture
        await new Promise((r) => requestAnimationFrame(r));

        const canvas = await html2canvas(el, {
          scale: H2C_SCALE,
          useCORS: true,
          backgroundColor: "#ffffff", // force white background for consistent compression
          scrollX: 0,
          scrollY: 0,
          removeContainer: true,
          // Ensure the loader is not included in the cloned DOM used by html2canvas
          onclone: (clonedDoc) => {
            const loader = clonedDoc.getElementById("pdf-export-loader");
            if (loader && loader.parentNode)
              loader.parentNode.removeChild(loader);
          },
        });

        await addCanvasToPdf(pdf, canvas, 5 /* margin in mm */);

        if (i < sections.length - 1) pdf.addPage();
      } catch (sectionErr) {
        console.warn("Skipping section due to render error:", sectionErr);
      }
    }

    pdf.save("report.pdf");
  } catch (err) {
    console.error("Failed to generate PDF:", err);
  } finally {
    // Always hide loader
    hideLoader();
  }
}

export { addCanvasToPdf };

// Minimal, self-contained loader overlay (no external CSS or deps)
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
    "background:rgba(255,255,255,0.75)",
    "z-index:2147483646",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "pointer-events:none",
  ].join(";");

  overlay.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding:18px 22px;border-radius:10px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.12);color:#111827;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif">
      <svg width="40" height="40" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="18" stroke="#2563eb" stroke-width="4" stroke-linecap="round" fill="none" stroke-dasharray="80" stroke-dashoffset="60">
          <animateTransform attributeName="transform" type="rotate" from="0 22 22" to="360 22 22" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div class="msg" style="font-weight:600">${message}</div>
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
