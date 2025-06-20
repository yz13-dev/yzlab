import chrome from "@sparticuz/chromium";
import { chromium } from 'playwright';

const timeout = 60000;

export async function getScreenshotWithPlaywright(url: string, fullPage = false, quality = 100): Promise<Buffer<ArrayBufferLike> | null> {
  try {
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
    await page.goto(url, { waitUntil: "load", timeout });

    const title = (await page.title()).toLowerCase()

    const isCaptcha = title.includes("just a moment")

    if (isCaptcha) {
      throw new Error("Captcha detected");
    }

    const screenshot = await page.screenshot({
      timeout,
      fullPage,
      type: 'jpeg',
      quality,
    });

    await browser.close();
    return screenshot;
  } catch (error) {
    console.error(error);
    return null;
  }
}
