import { Hono } from "hono";
import { crawl as crawlAction } from "./action";

export const crawl = new Hono();

crawl.post("/", async (c) => {
  const url = c.req.query("url");
  const js = c.req.query("js");

  const renderJS = js === "true";

  if (!url) return c.json({ error: "Missing URL" }, 400);

  const crawlStart = performance.now();

  try {
    const result = await crawlAction({ url, js: renderJS });
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
