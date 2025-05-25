import { Hono } from "hono";
import { createClient } from "db/supabase/server";
import { cookies } from "next/headers";
import { crawl } from "../crawl/action";
import { createAdminClient } from "db/supabase/admin";
import { writeInDomains, writeInLinks } from "./action";
import { qstash } from "@/app/extensions/qstash";
import { API_URL } from "@/const/url";

export const indexing = new Hono();

// .select(
//   `
//   *,
//   news_source:news_sources(*)
//   `,
// )

indexing.get("/", async (c) => {
  try {
    const cookieStore = await cookies();
    const client = createClient(cookieStore);
    const { data, error } = await client.from("domains").select(
      `
        *,
        links:links(*),
        snippets:snippets(*)
      `,
    );
    if (error) {
      console.log(error);
      return c.json(null, 500);
    }
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});

indexing.get("/callback", async (c) => {
  const body = await c.req.json();
  console.log(body);
  return c.json(null, 200);
});

indexing.get("/:domain", async (c) => {
  const domain = c.req.param("domain");

  if (!domain) return c.json(null, 400);

  try {
    const cookieStore = await cookies();
    const client = createClient(cookieStore);
    const { data, error } = await client
      .from("domains")
      .select(
        `
          *,
          links:links(*),
          snippets:snippets(*)
        `,
      )
      .eq("domain", domain)
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null, 500);
    }
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});

indexing.post("/", async (c) => {
  const url = c.req.query("url");
  const js = c.req.query("js");
  const asQuery = c.req.query("as");

  const as = asQuery ?? "domain";

  const isValidAs = as === "domain" || as === "link";

  const renderJS = js === "true";
  try {
    if (!isValidAs) throw new Error("Invalid as");
    if (!url) throw new Error("Missing URL");
    const baseUrl = new URL(url);
    if (!baseUrl) throw new Error("Invalid URL");
    const pathname = baseUrl.pathname;
    if (as === "domain" && pathname !== "/") throw new Error("Invalid path");
    if (as === "link" && pathname === "/") throw new Error("Invalid path");

    const result = await crawl({ url, js: renderJS });

    const callbackUrl = new URL("/indexing/callback", API_URL);

    if (!result) throw new Error("Failed crawl");
    if (!result.domain) throw new Error("Missing domain");

    if (as === "domain") {
      const links = result.links ?? [];
      const { data, error } = await writeInDomains({
        description: result.description ?? "",
        title: result.title ?? "",
        favicon: result.favicon,
        tags: result.tags,
        last_crawled_at: null,
        domain: result.domain,
      });

      if (links.length !== 0) {
        const queue = qstash.queue({
          queueName: "code-indexing",
        });
        for (const link of links) {
          const linkUrl = new URL(API_URL);
          const linkSearchParams = linkUrl.searchParams;
          linkSearchParams.append("url", link);
          linkSearchParams.append("as", "link");
          // console.log(decodeURIComponent(linkUrl.toString()));
          queue.enqueueJSON({
            url: linkUrl.toString(),
            method: "POST",
            delay: 1 * 60 * 60 * 1000, // 1h,
            deduplicationId: link,
            callback: callbackUrl.toString(),
          });
        }
      }

      // @ts-expect-error
      const isDuplicateError = error?.code === "23505";

      if (error) {
        if (isDuplicateError) return c.json(null, 200);
        console.log(error);
        return c.json(null, 500);
      }
      return c.json(data, 200);
    }

    if (as === "link") {
      const links = result.links ?? [];
      const { data, error } = await writeInLinks({
        description: result.description ?? "",
        title: result.title ?? "",
        last_crawled_at: null,
        pathname: result.pathname,
        domain: result.domain,
      });

      if (links.length !== 0) {
        const queue = qstash.queue({
          queueName: "code-indexing",
        });
        for (const link of links) {
          const linkUrl = new URL(API_URL);
          const linkSearchParams = linkUrl.searchParams;
          linkSearchParams.append("url", link);
          linkSearchParams.append("as", "link");
          // console.log(decodeURIComponent(linkUrl.toString()));
          queue.enqueueJSON({
            url: linkUrl.toString(),
            method: "POST",
            delay: 1 * 60 * 60 * 1000, // 1h,
            deduplicationId: link,
            callback: callbackUrl.toString(),
          });
        }
      }

      // @ts-expect-error
      const isDuplicateError = error?.code === "23505";

      if (error) {
        if (isDuplicateError) return c.json(null, 200);
        console.log(error);
        return c.json(null, 500);
      }
      return c.json(data, 200);
    }

    return c.json(null, 400);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});
