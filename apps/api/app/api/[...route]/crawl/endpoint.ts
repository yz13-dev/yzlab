import { Hono } from "hono";
import { crawlMetadata, crawlScreenshot, crawlSimple, crawlSnippets, crawlVideo } from "./action";

export const crawl = new Hono();

crawl.post("/", async (c) => {
  const url = c.req.query("url");
  const preset = c.req.query("preset")?.toUpperCase();

  const js = c.req.query("js");
  const full = c.req.query("full");

  const defaultPreset = "DEFAULT";

  if (!url) return c.json({ error: "Missing URL" }, 400);

  if (preset === defaultPreset) {
    return c.json(await crawlSimple({ url }));
  }

  if (preset === "SNIPPETS") {
    const renderJS = js === "true";
    return c.json(await crawlSnippets({ url, js: renderJS }));
  }

  if (preset === "OG") {
    return c.json(await crawlMetadata({ url }));
  }

  if (preset === "SCREENSHOT") {
    const fullPage = full === "true";
    return c.json(await crawlScreenshot({ url, fullPage }));
  }

  return c.json({ error: "Not a preset" }, 400);
})

crawl.post("/snippets", async (c) => {
  const url = c.req.query("url");
  const js = c.req.query("js");

  const renderJS = js === "true";

  if (!url) return c.json({ error: "Missing URL" }, 400);

  const crawlStart = performance.now();

  try {
    const result = await crawlSnippets({ url, js: renderJS });
    const crawlEnd = performance.now();
    const crawlDuration = crawlEnd - crawlStart;

    if (result.error) throw new Error(result.error);
    return c.json({
      ...result,
      duration: crawlDuration,
    });
  } catch (e) {
    console.error("[ERROR]", e);
    const crawlEnd = performance.now();
    const crawlDuration = crawlEnd - crawlStart;

    console.log("DURATION:", crawlDuration, "ms");
    return c.json({ error: "Failed to crawl", duration: crawlDuration }, 500);
  }
});

crawl.post("/screenshot", async (c) => {
  const url = c.req.query("url");
  const full = c.req.query("full");

  const fullPage = full === "true";

  if (!url) return c.json({ error: "Missing URL" }, 400);

  const start = performance.now();
  try {

    const preview = await crawlScreenshot({ url, fullPage, quality: 1 })

    const result = await crawlScreenshot({ url, fullPage })
    const end = performance.now();
    const duration = end - start;

    if (result.error) throw new Error(result.error);
    return c.json({
      ...result,
      preview: preview.screenshot,
      duration,
    });
  } catch (e) {
    console.error("[ERROR]", e);
    const end = performance.now();
    const duration = end - start;

    console.log("DURATION:", duration, "ms");
    return c.json({ error: "Failed to crawl", duration }, 500);
  }
})

crawl.post("/video", async (c) => {
  const url = c.req.query("url");

  if (!url) return c.json({ error: "Missing URL" }, 400);

  const start = performance.now();
  try {
    const result = await crawlVideo({ url })
    const end = performance.now();
    const duration = end - start;

    if (result.error) throw new Error(result.error);
    return c.json({
      ...result,
      duration,
    });
  } catch (e) {
    console.error("[ERROR]", e);
    const end = performance.now();
    const duration = end - start;

    console.log("DURATION:", duration, "ms");
    return c.json({ error: "Failed to crawl", duration }, 500);
  }
})


crawl.post("/og", async (c) => {
  const url = c.req.query("url");

  if (!url) return c.json({ error: "Missing URL" }, 400);

  const crawlStart = performance.now();

  try {
    const result = await crawlMetadata({ url });
    const crawlEnd = performance.now();
    const crawlDuration = crawlEnd - crawlStart;

    if (result.error) throw new Error(result.error);
    return c.json({
      ...result,
      duration: crawlDuration,
    });
  } catch (e) {
    console.error("[ERROR]", e);
    const crawlEnd = performance.now();
    const crawlDuration = crawlEnd - crawlStart;

    console.log("DURATION:", crawlDuration, "ms");
    return c.json({ error: "Failed to crawl", duration: crawlDuration }, 500);
  }
})
