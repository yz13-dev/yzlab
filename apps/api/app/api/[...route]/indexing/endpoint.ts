import { API_URL } from "@/const/url";
import { serve } from "@upstash/workflow/hono";
import { createClient } from "db/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { crawl } from "../crawl/action";
import {
  clearSnippets,
  createOrUpdateDomain,
  createOrUpdateLink,
  getOldIndexedDomain,
  getUnIndexedDomain,
  getUnIndexedLinks,
  writeInSnippets,
} from "./action";

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
  const deepQuery = c.req.query("deep");

  const as = asQuery ?? "domain";
  const deep = deepQuery === "true";

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

    const snippets = result.snippets;
    if (result.snippets.length !== 0) {
      console.log("Snippets:", snippets.length);
      const promises = snippets.map((snippet) => {
        console.log("Snippet:", snippet, pathname);
        return writeInSnippets({
          code: snippet.code,
          language: snippet.language,
          domain: baseUrl.host,
          pathname,
        });
      });
      await Promise.all(promises);
    } else console.log("No snippets found");

    if (as === "domain") {
      const response = await createOrUpdateDomain({
        description: result.description ?? "",
        title: result.title ?? "",
        favicon: result.favicon,
        tags: result.tags,
        last_crawled_at: new Date().toISOString(),
        domain: result.domain,
      });

      await clearSnippets(result.domain);

      const links = result.links;

      if (renderJS === false && links.length === 0) {
        const base = new URL("/indexing", API_URL);
        const searchParams = base.searchParams;
        searchParams.set("url", url);
        searchParams.set("as", "domain");
        searchParams.set("js", "true");
        if (deep) {
          searchParams.set("deep", "true");
        }
        const response = await fetch(base.toString(), {
          method: "POST",
        });
        return c.json(response);
      }

      console.log("DEEP", deep);

      if (deep) {
        const promises = links.map((link) => {
          const url = new URL("/indexing", API_URL);
          const searchParams = url.searchParams;
          searchParams.set("url", link);
          searchParams.set("as", "link");
          return fetch(url.toString(), {
            method: "POST",
          });
        });

        Promise.all(promises);
      }

      return c.json(response);
    }

    if (as === "link") {
      const links = result.links;

      if (deep) {
        const promises = links.map((link) => {
          const url = new URL("/indexing", API_URL);
          const searchParams = url.searchParams;
          searchParams.set("url", link);
          searchParams.set("as", "link");
          return fetch(url.toString(), {
            method: "POST",
          });
        });

        Promise.all(promises);
      }

      if (snippets.length !== 0) {
        const response = await createOrUpdateLink({
          description: result.description ?? "",
          title: result.title ?? "",
          last_crawled_at: new Date().toISOString(),
          pathname: result.pathname,
          domain: result.domain,
        });
        return c.json(response);
      }

      if (renderJS && links.length === 0) {
        const base = new URL("/indexing", API_URL);
        const searchParams = base.searchParams;
        searchParams.set("url", url);
        searchParams.set("as", "domain");
        searchParams.set("js", "true");
        if (deep) {
          searchParams.set("deep", "true");
        }
        const response = await fetch(base.toString(), {
          method: "POST",
        });
        return c.json(response);
      }
    }
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
      const unIndexedDomain = await getUnIndexedDomain();
      const oldIndexedDomain = await getOldIndexedDomain();

      const domain = unIndexedDomain.data ?? oldIndexedDomain.data;

      if (!domain) {
        await context.cancel();
        return null;
      }

      console.log("INDEXING DOMAIN:", domain.domain);
      const url = new URL("/indexing", API_URL);
      const searchParams = url.searchParams;

      const domainAsUrl = `https://${domain.domain}`;
      const domainUrl = new URL("/", domainAsUrl);
      searchParams.set("url", domainUrl.toString());
      searchParams.set("as", "domain");
      const response = await fetch(url.toString(), {
        method: "POST",
      });
      const status = response.status;
      console.log("INDEXING STATUS:", status);

      console.log("DOMAIN:", domain.domain);

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

        const promises = links.map((link) => {
          console.log("INDEXING LINK:", link.domain, link.pathname);
          const url = new URL("/indexing", API_URL);
          const searchParams = url.searchParams;

          const linkUrl = new URL(link.pathname, link.domain);
          searchParams.set("url", linkUrl.toString());
          searchParams.set("as", "link");
          searchParams.set("deep", "true");
          return fetch(url.toString(), {
            method: "POST",
          });
        });

        Promise.all(promises);

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

indexing.delete("/", async (c) => {
  return c.json(null, 200);
});
