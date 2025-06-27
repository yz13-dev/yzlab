import { fetchPageContent } from "@/lib/fetch/page";
import { LinkWithBufferScreenshot, linkWithBufferScreenshot } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { formatISO } from "date-fns";
import { crawlDefault, crawlMetadata, crawlScreenshot } from "../../crawl/action";

const route = createRoute({
  operationId: "getIndexPreview",
  method: "post",
  path: "/",
  description: "Get preview of a link",
  tags: ["Indexing"],
  request: {
    query: z.object({
      url: z.string().url("URL must be valid").min(1, "URL is required"),
    }),
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          // @ts-expect-error
          schema: linkWithBufferScreenshot,
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: z.null().openapi("error"),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.null().openapi("error"),
        }
      },
    },
  },
});

export const preview = new OpenAPIHono();


preview.openapi(route, async (c) => {

  const url = c.req.query("url")

  if (!url) return c.json(null, 400);

  const link = new URL(url);

  const pathname = link.pathname;
  const domain = link.hostname;
  const domainAsUrl = `https://${domain}${pathname}`;

  const start = performance.now();

  const crawl = await (async () => {

    if (!link) {
      return { data: null, screenshot: null, og: null }
    }

    console.log("link", domainAsUrl)

    const html = await fetchPageContent(domainAsUrl)

    const defaultCrawl = crawlDefault({ url: domainAsUrl, html })

    const screenshotCrawl = crawlScreenshot({ url: domainAsUrl })


    const metadataCrawl = crawlMetadata({ url: domainAsUrl, html })


    const [data, screenshot, metadata] = await Promise.all([defaultCrawl, screenshotCrawl, metadataCrawl])

    const tags = data?.tags ?? [];

    const keywords = tags.find(tag => tag.attributes.name === "keywords")

    console.log("keywords", (keywords ?? []))

    const themeColors = tags.filter(tag => tag.attributes.name === "theme-color")

    const themed = themeColors.length > 0

    console.log("[LINK]: Can be themed?", themed)

    const og = metadata?.image;

    if (screenshot) {
      return { data, screenshot, og }
    }


    if (!data) {
      return { data: null, screenshot: null, og }
    }

    return { data, screenshot: null, og }
  })()

  const end = performance.now();
  console.log("crawl time", end - start);

  const { data, screenshot, og } = crawl;

  // console.log("data", data)
  // console.log("screenshot", !!screenshot)
  // console.log("og", !!og)

  const domainLink: LinkWithBufferScreenshot = {
    clicks: -1,
    pathname,
    last_crawled_at: formatISO(new Date()),
    domain,
    title: data?.title ?? "Без заголовка",
    description: data?.description ?? "Без описания",
    favicon: data?.favicon ?? null,
    screenshot,
    og: og ?? null,
    created_at: formatISO(new Date()),
    id: -1,
    tags: []
  }

  return c.json(domainLink, 200);
});
