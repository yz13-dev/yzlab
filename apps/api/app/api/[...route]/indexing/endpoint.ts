import { fetchPageContent } from "@/lib/fetch/page";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import { crawlDefault, crawlMetadata, crawlScreenshot } from "../crawl/action";
import { getNotCrawledDomain, updateDomain } from "../domains/actions";
import { createLinks, getDomainLinks, getNotCrawledLink, updateLink } from "../links/actions";
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
      const preparedLinks = links.map((link) => {
        return {
          domain: domain.domain,
          pathname: link,
        }
      })
      if (preparedLinks.length !== 0) {
        const existedLinks = await getDomainLinks(domain.domain)
        if (existedLinks.length === 0) {
          await createLinks(preparedLinks)
        } else {
          const filtered = preparedLinks.filter((link) => {
            return !existedLinks.find((existedLink) => existedLink.pathname === link.pathname)
          })
          if (filtered.length !== 0) {
            await createLinks(filtered)
          }
        }
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

      const defaultCrawl = await crawlDefault({ url: domainAsUrl, html })

      const screenshotCrawl = await crawlScreenshot({ url: domainAsUrl })

      const metadataCrawl = await crawlMetadata({ url: domainAsUrl, html })

      const screenshot = screenshotCrawl.screenshot;
      const image = metadataCrawl?.image;

      console.log("crawl", defaultCrawl);

      if (!defaultCrawl) {
        await context.cancel();
        return null;
      }


      const result = await updateLink(linkId, {
        last_crawled_at: defaultCrawl.crawledAt,
        domain: link.domain,
        title: defaultCrawl.title,
        description: defaultCrawl.description,
        favicon: defaultCrawl.favicon,
        screenshot: screenshot ? toBase64(screenshot) : null,
        image
      })

      console.log("result", result);

      if (!result) {
        return null;
      }

      return link;
    });

    return link;
  }),
);

indexing.delete("/", async (c) => {
  return c.json(null, 200);
});
