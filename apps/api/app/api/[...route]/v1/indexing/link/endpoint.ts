import { clearLinksCache } from "@/lib/cache";
import { deleteScreenshot, uploadScreenshot } from "@/lib/storage";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import { getNotCrawledLink, getOldCrawledLink, updateLink } from "../../links/actions";
import { getFullIndexing, getOgIndexing, getSiteIndexing, reCacheLinks } from "../actions";

export const link = new Hono();

link.post(
  "/",
  serve(async (context) => {
    const link = await context.run("retrieve link", async () => {
      console.group("[LINK]");

      const oldIndexed = getOldCrawledLink();

      const notIndexed = getNotCrawledLink();

      const [old, not] = await Promise.all([oldIndexed, notIndexed]);

      if (!old && !not) {
        console.log("cancel because old and not are null")
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
