import puppeteer, { Browser } from "puppeteer";

let browser: Browser | null = null;

/**
 * Browser Singleton - Tránh launch Chromium nhiều lần
 */
export async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    console.log("[BROWSER] Launching new browser instance...");
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
    console.log("[BROWSER] Browser launched successfully");
  }
  
  return browser;
}

/**
 * Graceful shutdown
 */
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
    console.log("[BROWSER] Browser closed");
  }
}

// Cleanup on process exit
process.on("SIGINT", async () => {
  await closeBrowser();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeBrowser();
  process.exit(0);
});
