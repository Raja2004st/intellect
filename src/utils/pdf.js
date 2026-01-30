import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function addCanvasToPdf(pdf, canvas, marginMm = 0) {
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const usableW = pageW - marginMm * 2;
  const usableH = pageH - marginMm * 2;

  const imgHByWidth = (canvas.height * usableW) / canvas.width;

  if (imgHByWidth <= usableH) {
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", marginMm, marginMm, usableW, imgHByWidth);
    return;
  }

  const APPROX_SECTION_PX = 950;
  const TOLERANCE_PX = 40;
  if (canvas.height <= APPROX_SECTION_PX + TOLERANCE_PX) {
    const targetH = usableH;
    const targetW = (canvas.width * targetH) / canvas.height;
    const x = marginMm + Math.max(0, (usableW - targetW) / 2);
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", x, marginMm, targetW, targetH);
    return;
  }

  const pxPerMm = canvas.width / usableW;
  const sliceHeightPx = Math.floor(usableH * pxPerMm);

  let yPx = 0;
  while (yPx < canvas.height) {
    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = Math.min(sliceHeightPx, canvas.height - yPx);

    const ctx = sliceCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      yPx,
      canvas.width,
      sliceCanvas.height,
      0,
      0,
      canvas.width,
      sliceCanvas.height,
    );

    const sliceImgData = sliceCanvas.toDataURL("image/png");
    const sliceImgH = (sliceCanvas.height * usableW) / sliceCanvas.width;

    pdf.addImage(sliceImgData, "PNG", marginMm, marginMm, usableW, sliceImgH);

    yPx += sliceHeightPx;
    if (yPx < canvas.height) pdf.addPage();
  }
}

// export async function downloadPdfSplitByHeader() {
//   const sections = Array.from(document.querySelectorAll(".pdf-section"));
//   if (!sections.length) return;

//   const pdf = new jsPDF("p", "mm", "a4");

//   for (let i = 0; i < sections.length; i++) {
//     const el = sections[i];

//     const canvas = await html2canvas(el, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: i === 0 ? "#ffffff" : "#000",
//       scrollY: -window.scrollY,
//     });

//     await addCanvasToPdf(pdf, canvas, 0);

//     if (i < sections.length - 1) pdf.addPage();
//   }

//   pdf.save("report.pdf");
// }
export async function downloadPdfSplitByHeader() {
  const sections = Array.from(document.querySelectorAll(".pdf-section"));
  if (!sections.length) return;

  const pdf = new jsPDF("p", "mm", "a4");

  for (let i = 0; i < sections.length; i++) {
    const el = sections[i];

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: i === 0 ? "#ffffff" : "#000",
      scrollY: -window.scrollY,
    });

    await addCanvasToPdf(pdf, canvas, 0.1);

    if (i < sections.length - 1) pdf.addPage();
  }

  pdf.save("report.pdf");
}

export { addCanvasToPdf };
