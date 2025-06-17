import chrome from "@sparticuz/chromium";
import { chromium } from 'playwright';

export async function getScreenshotWithPlaywright(url: string, fullPage = false, quality = 100): Promise<Buffer> {
  const browser = await chromium.launch({
    executablePath: await chrome.executablePath(),
    headless: true,
    timeout: 50000,
    args: [
      '--no-sandbox',
      ...chrome.args
    ],
  });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const screenshot = await page.screenshot({
    timeout: 50000,
    fullPage,
    type: 'jpeg',
    quality,
  });

  await browser.close();
  return screenshot;
}
