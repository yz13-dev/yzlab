import { createClient } from "db/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";


export const domains = new Hono();


domains.get("/:domain", async (c) => {

  const domain = c.req.param("domain");

  try {
    const cookieStore = await cookies();
    const client = createClient(cookieStore);
    const { data, error } = await client
      .from("domains")
      .select("*")
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
