import { Hono } from "hono";
import { createClient } from "db/supabase/server";
import { cookies } from "next/headers";
import { crawl } from "../crawl/action";
import { createAdminClient } from "db/supabase/admin";

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

indexing.post("/", async (c) => {
  const url = c.req.query("url");
  const js = c.req.query("js");

  const renderJS = js === "true";
  try {
    if (!url) throw new Error("Missing URL");
    const baseUrl = new URL(url);
    if (!baseUrl) throw new Error("Invalid URL");

    const result = await crawl({ url, js: renderJS });

    if (!result) throw new Error("Failed crawl");
    if (!result.domain) throw new Error("Missing domain");

    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("domains")
      .insert({
        domain: result.domain,
        description: result.description ?? "",
        title: result.title ?? "",
        favicon: result.favicon,
        tags: result.tags,
        last_crawled_at: null,
      })
      .select("*");

    if (error) {
      return c.json(null, 500);
    }
    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
});
