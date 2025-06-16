import { deleteKeysByPatterns } from "@/lib/cache";
import { fetchPageContent } from "@/lib/fetch/page";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import { crawlDefault, crawlMetadata, crawlScreenshot } from "../crawl/action";
import { getNotCrawledDomain, updateDomain } from "../domains/actions";
import { createLink, getNotCrawledLink, getRootLink, updateLink } from "../links/actions";
import { toBase64 } from "./actions";

export const indexing = new Hono();

indexing.post(
  "/domain",
  serve(async (context) => {
    const domain = await context.run("retrieve domains", async () => {
      console.group("[DOMAINS]");
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
      console.group("[DOMAINS]");
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

      console.log("screenshot-error", screenshotData.error)

      const screenshot = screenshotData.screenshot;
      const image = metadataData?.image;

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
        screenshot: screenshot ? toBase64(screenshot) : null,
        og: image,
      })

      console.log("result", result);

      if (!result) {
        return null;
      }

      deleteKeysByPatterns(["ogs:*", "sites:*"])

      return link;
    });

    return link;
  }),
);

indexing.delete("/", async (c) => {
  return c.json(null, 200);
});
