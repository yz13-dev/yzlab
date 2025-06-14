import { API_URL } from "@/const/url";
import { serve } from "@upstash/workflow/hono";
import { createClient } from "db/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";
import {
  getOldIndexedDomain,
  getUnIndexedDomain,
  getUnIndexedLinks
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
  return c.json({ error: "Not implemented" }, 501);
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
