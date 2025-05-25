import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookieOptions, CookieStore } from "./cookies";
import { Database } from "./database";

export const createAdminClient = (
  cookieStore: CookieStore
): SupabaseClient<Database> => {
  // @ts-ignore
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,

    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookieOptions,
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
      cookies: {
        getAll() {
          return (cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          try {
            (cookiesToSet).forEach(async ({ name, value, options }) => {
              (cookieStore).set(name, value, options)
            }
            );
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        },
      },
    }
  );
};
