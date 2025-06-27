import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import { crawlDefault } from "../../crawl/action";
import { getNotCrawledDomain, updateDomain } from "../../domains/actions";
import { createLink, getRootLink } from "../../links/actions";

export const domain = new Hono();

domain.post(
  "/",
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
