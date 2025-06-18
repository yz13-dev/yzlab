import { deleteKeysByPatterns } from "@/lib/cache";
import { fetchPageContent } from "@/lib/fetch/page";
import { uploadScreenshot } from "@/lib/storage";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import { crawlDefault, crawlMetadata, crawlScreenshot } from "../crawl/action";
import { getNotCrawledDomain, updateDomain } from "../domains/actions";
import { createLink, getNotCrawledLink, getRootLink, updateLink } from "../links/actions";
import { reCacheLinks } from "./actions";

export const indexing = new Hono();

indexing.post(
  "/domain",
  serve(async (context) => {
    const domain = await context.run("retrieve domains", async () => {
      console.group("[DOMAIN]");
      const data = await getNotCrawledDomain();

      const domain = data

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
    const link = await context.run("retrieve domains", async () => {
      console.group("[LINK]");
      const data = await getNotCrawledLink();

      const link = data

      if (!link) {
        await context.cancel();
        return null;
      }

      const linkId = link.id;
      const pathname = link.pathname;
      const domainAsUrl = `https://${link.domain}${pathname}`;

      console.log("domain", domainAsUrl)

      const html = await fetchPageContent(domainAsUrl)

      const defaultCrawl = crawlDefault({ url: domainAsUrl, html })

      const screenshotCrawl = crawlScreenshot({ url: domainAsUrl })


      const metadataCrawl = crawlMetadata({ url: domainAsUrl, html })


      const [defaultData, screenshotData, metadataData] = await Promise.all([defaultCrawl, screenshotCrawl, metadataCrawl])

      const tags = defaultData?.tags ?? [];

      const keywords = tags.find(tag => tag.attributes.name === "keywords")

      console.log("keywords", (keywords ?? []))


      const screenshot = screenshotData;
      const image = metadataData?.image;

      const uploaded = await uploadScreenshot(link.domain, pathname, screenshot)

      console.log("crawl", defaultData);

      if (!defaultData) {
        await context.cancel();
        return null;
      }


      const result = await updateLink(linkId, {
        pathname,
        last_crawled_at: defaultData.crawledAt,
        domain: link.domain,
        title: defaultData.title,
        description: defaultData.description,
        favicon: defaultData.favicon,
        screenshot: uploaded?.fullPath ?? null,
        og: image,
      })

      console.log("result", result);

      if (!result) {
        return null;
      }

      deleteKeysByPatterns(["ogs:*", "sites:*"])


      reCacheLinks()

      return link;
    });

    return link;
  }),
);

indexing.delete("/", async (c) => {
  return c.json(null, 200);
});
