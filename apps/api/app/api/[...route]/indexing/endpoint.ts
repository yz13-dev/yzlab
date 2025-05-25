import { serve } from "@upstash/workflow/hono";
import { createClient } from "db/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { crawl } from "../crawl/action";
import {
  getUnIndexedDomain,
  getUnIndexedLinks,
  writeInDomains,
  writeInLinks,
} from "./action";
import { API_URL } from "@/const/url";
import { wait } from "@/lib/wait";

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
  const body = await c.req.text();
  const decoded = atob(body);

  console.log(decoded);

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

    if (!result) throw new Error("Failed crawl");
    if (!result.domain) throw new Error("Missing domain");

    console.group("[INDEXING]");
    console.log("URL:", url);
    console.log("Domain:", result.domain);
    console.log("AS:", as);
    console.groupEnd();

    if (as === "domain") {
      const { data, error } = await writeInDomains({
        description: result.description ?? "",
        title: result.title ?? "",
        favicon: result.favicon,
        tags: result.tags,
        last_crawled_at: null,
        domain: result.domain,
      });

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
      const { data, error } = await writeInLinks({
        description: result.description ?? "",
        title: result.title ?? "",
        last_crawled_at: null,
        pathname: result.pathname,
        domain: result.domain,
      });

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

indexing.post(
  "/workflow",
  serve(async (context) => {
    const domain = await context.run("retrieve domains", async () => {
      console.group("[DOMAINS]");
      const { data: domain } = await getUnIndexedDomain();

      console.log("DOMAINS COUNT:", domain?.domain);
      console.groupEnd();
      return domain;
    });

    const links = await context.run("retrieve domain links", async () => {
      console.group("[LINKS]");
      const domainId = domain?.domain;

      if (!domainId) {
        await context.cancel();
        return [];
      }

      const { data: links } = await getUnIndexedLinks(domainId);

      console.log("LINKS COUNT:", links.length);

      console.groupEnd();
      return links;
    });

    const result = await context.run("indexing links", async () => {
      try {
        console.group("[INDEXING]");

        for (const link of links) {
          console.log("INDEXING LINK:", link.domain, link.pathname);
          const url = new URL("/indexing", API_URL);
          const response = await fetch(url.toString(), {
            method: "POST",
          });
          const status = response.status;
          console.log("INDEXING STATUS:", status);
          const TIMEOUT = 5 * 60 * 1000; // 5 minutes
          await wait(TIMEOUT);
        }

        console.groupEnd();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    });
    return result;
  }),
);
