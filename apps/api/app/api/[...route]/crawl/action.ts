import { extractContent, extractMetadata, extractSnippets } from "@/lib/extract-content";
import { fetchPageContent } from "@/lib/fetch/page";
import { getScreenshotWithPuppeteer } from "@/lib/fetch/puppeteer";

type CrawlProps = {
  html: string;
  url: string;
};

export async function crawlDefault({ url }: { url: string }) {
  try {
    const html = await fetchPageContent(url);
    const doc = extractContent(html, url);

    const crawledAt = new Date().toISOString();

    console.groupEnd();

    return {
      ...doc,
      crawledAt,
      error: null,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      error: message ?? "Unknown error",
    };
  }
}

export async function crawlSimple({ url, html }: CrawlProps) {
  try {
    const baseUrl = new URL(url);

    const pathname = baseUrl.pathname;

    const doc = extractContent(html, url);

    console.group("[CRAWLED]");
    console.log("URL:", baseUrl.origin);
    console.log("PATH:", baseUrl.pathname);
    console.log("LINKS:", doc.links.length);

    const crawledAt = new Date().toISOString();

    console.groupEnd();
    return {
      error: null,
      crawledAt,
      pathname,
      ...doc,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      error: message ?? "Unknown error",
    };
  }
}

export async function crawlSnippets({ url, html }: CrawlProps) {
  try {
    const baseUrl = new URL(url);

    const pathname = baseUrl.pathname;

    const doc = extractSnippets(html, url);

    console.group("[CRAWLED]");
    console.log("URL:", baseUrl.origin);
    console.log("PATH:", baseUrl.pathname);
    console.log("LINKS:", doc.links.length);
    console.log("SNIPPETS:", doc.snippets.length);

    const crawledAt = new Date().toISOString();

    console.groupEnd();

    return {
      error: null,
      crawledAt,
      pathname,
      ...doc,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      error: message ?? "Unknown error",
    };
  }
}

export async function crawlMetadata({ url, html }: CrawlProps) {
  try {

    const doc = extractMetadata(html, url);

    const crawledAt = new Date().toISOString();

    return {
      error: null,
      crawledAt,
      ...doc
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      error: message ?? "Unknown error",
    };
  }
}

export async function crawlScreenshot({ url, fullPage = false, quality = 100 }: { url: string, fullPage?: boolean, quality?: number }) {
  try {
    const screenshot = await getScreenshotWithPuppeteer(url, fullPage, quality);

    console.groupEnd();
    return {
      error: null,
      screenshot,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      screenshot: null,
      error: message ?? "Unknown error",
    };
  }
}

export async function crawlVideo({ url }: { url: string }) {
  try {
    const video = await getScreenshotWithPuppeteer(url);
    console.groupEnd();
    return {
      error: null,
      video,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      video: null,
      error: message ?? "Unknown error",
    };
  }
}
