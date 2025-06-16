import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer";
import { wait } from "../wait";

export async function fetchWithPuppeteer(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await chromium.executablePath(),
    args: [...chromium.args, "--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const html = await page.content();
  await browser.close();
  return html;
}

export async function getScreenshotWithPuppeteer(url: string, fullPage = false, quality = 100): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await chromium.executablePath(),
    args: [
      ...chromium.args,
      "--no-sandbox",
      ...puppeteer.defaultArgs({ headless: "shell" }),
    ],
  });

  const page = await browser.newPage();

  // set widht and height for page
  await page.setViewport({
    width: 1440,
    height: 900,
  });

  await page.goto(url, { waitUntil: "networkidle2", timeout: 50000 });

  await wait(1000);

  const screenshot = await page.screenshot({
    fullPage,
    encoding: "base64",
    type: "jpeg",
    quality,
    optimizeForSpeed: true,
  });

  await browser.close();
  return screenshot;
}

export async function getVideoWithPuppeteer(url: string): Promise<string> {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await chromium.executablePath(),
    args: [...chromium.args, "--no-sandbox"],
  });
  const page = await browser.newPage();

  // set widht and height for page
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  // Функция для проверки достижения конца страницы
  const isAtBottom = async () => {
    return await page.evaluate(() => {
      return window.innerHeight + window.scrollY >= document.body.scrollHeight;
    });
  };

  // Функция для плавного скроллинга
  const scrollStep = async () => {
    await page.evaluate(() => {
      const scrollHeight = window.innerHeight / 2;
      window.scrollBy({ top: scrollHeight, behavior: "smooth" });
    });
    await wait(1000) // Небольшая пауза между скроллами
  };

  const video = await page.screencast({ fps: 60, format: "gif" })

  // Скроллим страницу до конца
  let attempts = 0;
  const maxAttempts = 20; // Максимальное количество попыток скролла

  while (attempts < maxAttempts && !(await isAtBottom())) {
    await scrollStep();
    attempts++;
  }

  await video.stop()

  await browser.close();

  // return await video.toArray()
  return video.compose(video)
}
