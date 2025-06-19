import { createClient } from "@yzlab/supabase/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";

export const snippets = new Hono();

snippets.get("/:snippetId", async (c) => {
  const snippetId = c.req.param("snippetId");
  try {
    const id = Number.parseInt(snippetId);

    const cookieStore = await cookies();
    const client = createClient(cookieStore);

    const { data, error } = await client
      .from("snippets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.log(error);
      return c.json(null, 404);
    }

    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null, 404);
  }
});
