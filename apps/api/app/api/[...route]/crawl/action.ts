import { checkFavicon } from "@/lib/check-favicon";
import { extractContent, extractMetadata } from "@/lib/extract-content";
import { extractLinks } from "@/lib/extract-links";
import { fetchPageContent } from "@/lib/fetch/page";
import { getScreenshotWithPuppeteer } from "@/lib/fetch/puppeteer";

type CrawlProps = {
  url: string;
  js?: boolean;
};

export async function crawlSimple({ url }: { url: string }) {
  try {
    const baseUrl = new URL(url);

    const pathname = baseUrl.pathname;

    const isRoot = pathname === "/";

    const html = await fetchPageContent(url);
    const doc = extractContent(html, url);

    const title = doc.title;
    const description = doc.description;
    const tags = isRoot ? doc.tags : [];

    const links = extractLinks(html);

    const favicon = checkFavicon(
      tags.find(
        (tag) =>
          tag.attributes.rel === "icon" ||
          tag.attributes.rel === "shortcut icon" ||
          tag.attributes.rel === "icon shortcut",
      )?.attributes?.href ?? null,
      baseUrl.origin,
    );

    const linksWithBaseUrl = links.map((link) =>
      new URL(link, baseUrl).toString(),
    );

    console.group("[CRAWLED]");
    console.log("URL:", baseUrl.origin);
    console.log("PATH:", baseUrl.pathname);
    console.log("LINKS:", links.length);

    const crawledAt = new Date().toISOString();

    console.groupEnd();

    return {
      error: null,
      favicon: favicon ?? null,
      crawled_at: crawledAt,
      domain: baseUrl.host,
      pathname,
      title,
      description,
      tags,
      links: linksWithBaseUrl,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      error: message ?? "Unknown error",
    };
  }
}

export async function crawlSnippets({ url, js = false }: CrawlProps) {
  try {
    const baseUrl = new URL(url);

    const pathname = baseUrl.pathname;

    const isRoot = pathname === "/";

    const html = await fetchPageContent(url, js);
    const doc = extractContent(html, url);

    const title = doc.title;
    const description = doc.description;
    const tags = isRoot ? doc.tags : [];
    const snippets = doc.snippets;

    const links = extractLinks(html);

    const favicon = checkFavicon(
      tags.find(
        (tag) =>
          tag.attributes.rel === "icon" ||
          tag.attributes.rel === "shortcut icon" ||
          tag.attributes.rel === "icon shortcut",
      )?.attributes?.href ?? null,
      baseUrl.origin,
    );

    const linksWithBaseUrl = links.map((link) =>
      new URL(link, baseUrl).toString(),
    );

    console.group("[CRAWLED]");
    console.log("URL:", baseUrl.origin);
    console.log("PATH:", baseUrl.pathname);
    console.log("LINKS:", links.length);
    console.log("SNIPPETS:", snippets.length);

    const crawledAt = new Date().toISOString();

    console.groupEnd();

    return {
      error: null,
      favicon: favicon ?? null,
      crawled_at: crawledAt,
      domain: baseUrl.host,
      pathname,
      title,
      description,
      tags,
      snippets,
      links: linksWithBaseUrl,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      error: message ?? "Unknown error",
    };
  }
}

export async function crawlMetadata({ url }: { url: string }) {
  try {
    const baseUrl = new URL(url);
    const html = await fetchPageContent(url);
    const doc = extractMetadata(html, url);

    const tags = doc.tags;
    const metatags = doc.metatags;

    const titleTag = tags.find(tag => tag.attributes.property === "og:title");

    const imageTag = tags.find(tag => tag.attributes.property === "og:image");

    const image = imageTag?.attributes?.content;

    const favicon = doc.favicon;

    const title = titleTag?.attributes?.content;
    const description = doc.description;

    const crawledAt = new Date().toISOString();

    return {
      error: null,
      favicon,
      thumbnail: image,
      crawled_at: crawledAt,
      domain: baseUrl.host,
      title,
      description,
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
