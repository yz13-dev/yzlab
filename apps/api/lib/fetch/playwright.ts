import chrome from "@sparticuz/chromium";
import { chromium } from 'playwright';

const timeout = 60000;

export async function getScreenshotWithPlaywright(url: string, fullPage = false, quality = 100): Promise<Buffer> {
  const browser = await chromium.launch({
    executablePath: await chrome.executablePath(),
    headless: true,
    timeout,
    args: [
      '--no-sandbox',
      ...chrome.args
    ],
  });

  const page = await browser.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const screenshot = await page.screenshot({
    timeout,
    fullPage,
    type: 'jpeg',
    quality,
  });

  await browser.close();
  return screenshot;
}
