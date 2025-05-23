import puppeteer from "puppeteer";

export async function fetchWithPuppeteer(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: "shell" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const html = await page.content();
  await browser.close();
  return html;
}
