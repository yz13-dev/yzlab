import { createClient } from "@yzlab/supabase/supabase/server";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { loginSchema, registerSchema } from "./schemas";



export const auth = new Hono()

auth.get("/me", async (c) => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const auth = supabase.auth;
  const { data, error } = await auth.getUser();
  if (error) {
    return c.json({ status: "error", error: error.message }, 500);
  }
  return c.json({ status: "ok", data });
});

auth.post("/login", async (c) => {
  try {
    const body = await c.req.json();

    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return c.json({ status: "error", error: validated.error });
    }

    const email = body.email;
    const password = body.password;

    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const auth = supabase.auth;

    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return c.json({ status: "error", error: error.message }, 500);
    }

    return c.json({ status: "ok", data });
  } catch (error) {
    console.log(error)
    return c.json({ status: "error" }, 500);
  }
});

auth.post("/register", async (c) => {
  try {
    const body = await c.req.json();

    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return c.json({ status: "error", error: validated.error });
    }

    const email = body.email;
    const password = body.password;

    const username = body.username;

    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const auth = supabase.auth;

    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      }
    })

    if (error) {
      return c.json({ status: "error", error: error.message }, 500);
    }

    return c.json({ status: "ok", data });
  } catch (error) {
    console.log(error)
    return c.json({ status: "error" }, 500);
  }
});

auth.post("/logout", async (c) => {
  return c.json({ status: "ok" });
});
