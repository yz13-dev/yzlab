import { fetchPageContent } from "@/lib/fetch/page";
import { Hono } from "hono";
import { crawlMetadata, crawlScreenshot, crawlSimple, crawlSnippets } from "./action";

export const crawl = new Hono();

crawl.post("/", async (c) => {
  const url = c.req.query("url");
  const preset = c.req.query("preset")?.toUpperCase();

  const js = c.req.query("js");
  const full = c.req.query("full");

  const defaultPreset = "DEFAULT";

  if (!url) return c.json({ error: "Missing URL" }, 400);

  const renderJS = js === "true";

  const html = await fetchPageContent(url, renderJS);

  if (preset === defaultPreset) {
    const result = await crawlSimple({ url, html });

    return c.json({
      type: preset,
      ...result,
    });
  }

  if (preset === "SNIPPETS") {
    return c.json(await crawlSnippets({ url, html }));
  }

  if (preset === "OG") {
    return c.json(await crawlMetadata({ url, html }));
  }

  if (preset === "SCREENSHOT") {
    const fullPage = full === "true";
    return c.json(await crawlScreenshot({ url, fullPage }));
  }

  return c.json({ error: "Not a preset" }, 400);
})
