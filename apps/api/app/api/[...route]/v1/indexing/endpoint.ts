import { clearLinksCache } from "@/lib/cache";
import { fetchPageContent } from "@/lib/fetch/page";
import { deleteScreenshot, uploadScreenshot } from "@/lib/storage";
import { serve } from "@upstash/workflow/hono";
import { DomainLinkWithBufferScreenshot } from "@yzlab/api/types/domains";
import { formatISO } from "date-fns";
import { Hono } from "hono";
import { crawlDefault, crawlMetadata, crawlScreenshot } from "../crawl/action";
import { getNotCrawledDomain, updateDomain } from "../domains/actions";
import { createLink, getNotCrawledLink, getOldCrawledLink, getRootLink, updateLink } from "../links/actions";
import { getFullIndexing, getOgIndexing, getSiteIndexing, reCacheLinks } from "./actions";

export const indexing = new Hono();

indexing.post(
  "/domain",
  serve(async (context) => {
    const domain = await context.run("retrieve domains", async () => {
      console.group("[DOMAIN]");
      const data = await getNotCrawledDomain();

      const domain = data

      const domainTags = domain?.tags ?? [];

      if (!domain) {
        await context.cancel();
        return null;
      }

      const domainId = domain.id;
      const domainAsUrl = `https://${domain.domain}`;

      console.log("domain", domainAsUrl)

      const defaultCrawl = await crawlDefault({ url: domainAsUrl })

      const tags = defaultCrawl?.tags ?? [];

      const keywords = tags.find(tag => tag.attributes.name === "keywords")

      console.log("keywords", (keywords ?? []))

      const links = defaultCrawl?.links ?? [];

      console.log("links", links);

      const existedRootLink = await getRootLink(domain.domain)
      if (!existedRootLink) {
        await createLink(domain.domain, {
          domain: domain.domain,
          pathname: "/",
          tags: domainTags,
        })
      }

      console.log("crawl", defaultCrawl);

      if (!defaultCrawl) {
        await context.cancel();
        return null;
      }


      const result = await updateDomain(domainId, {
        last_crawled_at: defaultCrawl.crawledAt,
        domain: domain.domain,
        title: defaultCrawl.title,
        description: defaultCrawl.description,
        favicon: defaultCrawl.favicon,
      })

      console.log("result", result);

      if (!result) {
        return null;
      }

      return domain;
    });

    return domain;
  }),
);

indexing.post(
  "/link",
  serve(async (context) => {
    const link = await context.run("retrieve link", async () => {
      console.group("[LINK]");

      const oldIndexed = getOldCrawledLink();

      const notIndexed = getNotCrawledLink();

      const [old, not] = await Promise.all([oldIndexed, notIndexed]);

      if (!old && !not) {
        await context.cancel();
        return null;
      }

      return not ? not : old
    });

    const crawl = await context.run("do crawl magic", async () => {

      if (!link) {
        await context.cancel();
        return { data: null, screenshot: null, og: null }
      }

      const pathname = link.pathname;
      const domainAsUrl = `https://${link.domain}${pathname}`;

      const hasOgTag = (link.tags ?? []).find(tag => tag === "og")
      const hasSiteTag = (link.tags ?? []).find(tag => tag === "site")
      const hasBothTags = hasOgTag && hasSiteTag;

      if (!hasSiteTag && link.screenshot) await deleteScreenshot(link.domain, link.pathname)

      console.log("[LINK]:", domainAsUrl)

      if (hasBothTags) {

        const { data, screenshot, metadata } = await getFullIndexing(domainAsUrl)

        const og = metadata?.image;


        if (screenshot) {

          const uploaded = await uploadScreenshot(link.domain, pathname, screenshot)

          if (uploaded) {

            return { data, screenshot: uploaded.fullPath, og }
          }
        }

        return { data, screenshot: null, og }
      }

      if (hasOgTag) {

        const { data, metadata } = await getOgIndexing(domainAsUrl)

        const og = metadata?.image;

        return { data, screenshot: null, og }
      }

      if (hasSiteTag) {

        const { data, screenshot } = await getSiteIndexing(domainAsUrl)

        if (screenshot) {

          const uploaded = await uploadScreenshot(link.domain, pathname, screenshot)

          if (uploaded) {

            return { data, screenshot: uploaded.fullPath, og: null }
          }
        }

        return { data, screenshot: null, og: null }
      }

      await context.cancel();
      return { data: null, screenshot: null, og: null }
    })

    const result = await context.run("update link", async () => {

      const { data, screenshot, og } = crawl;

      if (!link) {
        console.log("cancel because link is null")
        await context.cancel();
        return null;
      }
      if (!data) {
        console.log("cancel because data is null")
        await context.cancel();
        return null;
      }
      if (!data.title && !data.description) {
        console.log("cancel because title or description is null")
        await context.cancel();
        return null;
      }

      const linkId = link.id;
      const pathname = link.pathname;

      const response = await updateLink(linkId, {
        pathname,
        last_crawled_at: data.crawledAt,
        domain: link.domain,
        title: data.title,
        description: data.description,
        favicon: data.favicon,
        screenshot: screenshot ?? null,
        og: og,
      })

      clearLinksCache()

      reCacheLinks()

      return response;
    })

    return result
  }),
);

indexing.delete("/", async (c) => {
  return c.json(null, 200);
});

indexing.post("/preview", async (c) => {

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

  const domainLink: DomainLinkWithBufferScreenshot = {
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
