import { getBrowser } from "./browser";

/**
 * Generate PDF từ HTML string
 */
export async function generatePDF(html: string): Promise<Buffer> {
  const browser = await getBrowser();
  
  console.log("[PDF_GEN] Creating new page...");
  const page = await browser.newPage();
  
  console.log("[PDF_GEN] Setting content...");
  await page.setContent(html, {
    waitUntil: ["domcontentloaded", "networkidle0"],
    timeout: 30000,
  });
  
  // Wait for fonts
  try {
    await page.evaluateHandle("document.fonts.ready");
    console.log("[PDF_GEN] Fonts loaded");
  } catch (fontError) {
    console.warn("[PDF_GEN] Font loading warning:", fontError);
  }
  
  console.log("[PDF_GEN] Generating PDF...");
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: false,
    displayHeaderFooter: false,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm",
    },
  });
  
  await page.close();
  console.log("[PDF_GEN] PDF generated, size:", pdf.length, "bytes");
  
  return Buffer.from(pdf);
}
