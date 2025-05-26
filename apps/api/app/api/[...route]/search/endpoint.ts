import { createClient } from "db/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";

export const search = new Hono();

search.get("/", async (c) => {
  const query = c.req.query("q");
  const offsetQuery = c.req.query("offset");

  const offset = offsetQuery ? Number.parseInt(offsetQuery) : 0;
  const limit = offset + 100;

  const text = query ?? "";
  try {
    if (!text) {
      return c.json([], 400);
    }
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

    return c.json(data, 200);
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return c.json([], 500);
  }
});
