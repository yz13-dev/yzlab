import { createClient } from "db/supabase/server";
import { Hono } from "hono";
import type { HTTPResponseError } from "hono/types";
import { cookies } from "next/headers";
import { requestSchema } from "./schemas";



export const requests = new Hono()



requests.post("/", async (c) => {
  try {
    const contentType = c.req.header("Content-Type")

    if (contentType !== "application/json") throw new Error("Invalid content type")

    const body = await c.req.json();

    const isValid = requestSchema.safeParse(body);

    if (!isValid.success) throw new Error(isValid.error.message);

    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("index-requests")
      .insert(body)
      .select("*")
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return c.json(data)
  } catch (error) {
    const err = error as HTTPResponseError;
    try {

      const parsedErrorMessage = JSON.parse(err.message);

      return c.json({ error: parsedErrorMessage }, 500);
    } catch (error) {
      return c.json({ error: err.message }, 500);
    }
  }
})


requests.post("/:id/accept", async (c) => {
  const id = c.req.param("id")
  try {
    return c.json({ error: "Not implemented" }, 501);
  } catch (error) {
    const err = error as HTTPResponseError;
    return c.json({ error: err.message }, 500);
  }
})

requests.post("/:id/reject", async (c) => {
  const id = c.req.param("id")
  try {
    return c.json({ error: "Not implemented" }, 501);
  } catch (error) {
    const err = error as HTTPResponseError;
    return c.json({ error: err.message }, 500);
  }
})
