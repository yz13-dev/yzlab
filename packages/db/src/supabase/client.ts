import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookieOptions } from "./cookies";
import { Database } from "./database";

export const createClient = (): SupabaseClient<Database> => {
  // @ts-ignore
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions,
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    },
  );
}
