import { extractContent } from "@/lib/extract-content";
import { fetchPageContent } from "@/lib/fetch/page";
import { Hono } from "hono";

export const crawl = new Hono();

crawl.post("/", async (c) => {
  const url = c.req.query("url");
  const js = c.req.query("js");

  const renderJS = js === "true";

  if (!url) return c.json({ error: "Missing URL" }, 400);

  try {
    const html = await fetchPageContent(url, renderJS);
    const doc = extractContent(html, url);

    const title = doc.title;
    const description = doc?.content ?? null;

    console.log("[CRAWLED]", url, doc.title);

    return c.json({ success: true, title, description });
  } catch (e) {
    console.error("[ERROR]", e);
    return c.json({ error: "Failed to crawl" }, 500);
  }
});
