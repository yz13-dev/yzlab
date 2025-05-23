import { fetchWithPuppeteer } from "./puppeteer";

export async function fetchPageContent(url: string, renderJS = false) {
  if (!renderJS) {
    const res = await fetch(url);
    return await res.text();
  }
  return await fetchWithPuppeteer(url);
}
