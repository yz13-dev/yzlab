import { expire, redis } from "@/extensions/redis";
import type { Snippet } from "@yzlab/api/types/domains";
import { createClient } from "@yzlab/supabase/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";

export const search = new Hono();

search.get("/", async (c) => {
  const query = c.req.query("q");
  const offsetQuery = c.req.query("offset");

  const offset = offsetQuery ? Number.parseInt(offsetQuery) : 0;
  const LIMIT = 25;
  const limit = offset + LIMIT;

  const text = query ?? "";

  const key = `search:${text}:${offset}:${limit}`;

  try {
    if (!text) {
      return c.json([], 400);
    }

    const cached = await redis.get<Snippet[]>(key);

    if (cached) {
      return c.json(cached, 200);
    }

    const durationStart = Date.now();
    const cookieStore = await cookies();

    const client = createClient(cookieStore);

    const { data, error } = await client
      .from("snippets")
      .select("*")
      .textSearch("code", text)
      .range(offset, limit);

    if (error) {
      return c.json([], 500);
    }
    const durationEnd = Date.now();
    const duration = durationEnd - durationStart;
    console.log(`Search took ${duration}ms`);

    if (data && data.length !== 0)
      await redis.set(key, data, { ex: expire.tenMin });

    return c.json(data, 200);
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return c.json([], 500);
  }
});

search.get("/filters", async (c) => {
  try {
    const cookieStore = await cookies();

    const client = createClient(cookieStore);

    const { data, error } = await client.from("snippets").select("language");

    if (error) {
      return c.json({ languages: [] }, 500);
    }

    const languages = [...new Set(data.map((d) => d.language))];

    return c.json({ languages }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ languages: [] }, 500);
  }
});
