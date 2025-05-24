import { extractContent } from "@/lib/extract-content";
import { extractLinks } from "@/lib/extract-links";
import { fetchPageContent } from "@/lib/fetch/page";
import { Hono } from "hono";

export const crawl = new Hono();

crawl.post("/", async (c) => {
  const url = c.req.query("url");
  const js = c.req.query("js");

  const renderJS = js === "true";

  if (!url) return c.json({ error: "Missing URL" }, 400);

  const crawlStart = performance.now();

  try {
    const baseUrl = new URL(url);

    const pathname = baseUrl.pathname;

    const isRoot = pathname === "/";

    const html = await fetchPageContent(url, renderJS);
    const doc = extractContent(html, url);

    const title = doc.title;
    const description = doc.description;
    const tags = isRoot ? doc.tags : [];
    const snippets = doc.snippets;

    const links = extractLinks(html);

    const favicon = tags.find(
      (tag) =>
        tag.attributes.rel === "icon" ||
        tag.attributes.rel === "shortcut icon" ||
        tag.attributes.rel === "icon shortcut",
    )?.attributes?.href;

    const linksWithBaseUrl = links.map((link) =>
      new URL(link, baseUrl).toString(),
    );

    console.group("[CRAWLED]");
    console.log("URL:", baseUrl.origin);
    console.log("PATH:", baseUrl.pathname);
    console.log("LINKS:", links.length);
    console.log("SNIPPETS:", snippets.length);

    const crawledAt = new Date().toISOString();

    const crawlEnd = performance.now();
    const crawlDuration = crawlEnd - crawlStart;

    console.log("DURATION:", crawlDuration, "ms");

    console.groupEnd();

    return c.json({
      error: null,
      duration: crawlDuration,
      favicon: favicon ?? null,
      crawled_at: crawledAt,
      domain: baseUrl.origin,
      pathname,
      title,
      description,
      tags,
      snippets,
      links: linksWithBaseUrl,
    });
  } catch (e) {
    console.error("[ERROR]", e);
    const crawlEnd = performance.now();
    const crawlDuration = crawlEnd - crawlStart;

    console.log("DURATION:", crawlDuration, "ms");
    return c.json({ error: "Failed to crawl", duration: crawlDuration }, 500);
  }
});
