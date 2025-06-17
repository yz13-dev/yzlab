import { extractContent, extractMetadata, extractSnippets } from "@/lib/extract-content";
import { fetchPageContent } from "@/lib/fetch/page";
import { getScreenshotWithPlaywright } from "@/lib/fetch/playwright";
import { getScreenshotWithPuppeteer } from "@/lib/fetch/puppeteer";

type CrawlProps = {
  html: string;
  url: string;
};

type DefaultCrawlData = {
  domain: string;
  title: string;
  description: string | undefined;
  content: string;
  tags: {
    name: string;
    attributes: {
      [name: string]: string;
    };
  }[];
  links: string[];
  error: string | null;
  crawledAt: string;
  favicon?: string;
}

export async function crawlDefault({ url, html: providedHtml }: { url: string, html?: string }): Promise<DefaultCrawlData | null> {
  try {
    const html = providedHtml ? providedHtml : await fetchPageContent(url);
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
    console.log(message)
    return null
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

    const doc = extractSnippets(html);

    console.group("[CRAWLED]");
    console.log("URL:", baseUrl.origin);
    console.log("PATH:", baseUrl.pathname);
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

    const doc = extractMetadata(html);

    const crawledAt = new Date().toISOString();

    return {
      error: null,
      crawledAt,
      ...doc
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    console.log(message)
    return null
  }
}

export async function crawlScreenshot({ url, fullPage = false, quality = 100 }: { url: string, fullPage?: boolean, quality?: number }) {
  try {
    const screenshot = await getScreenshotWithPlaywright(url, fullPage, quality);
    // const screenshot = await getScreenshotWithPuppeteer(url, fullPage, quality);

    console.groupEnd();
    return screenshot
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    console.log(message)
    return null
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
