import { CookieOptions as Options } from "@supabase/ssr";
import { cookies } from "next/headers";

const isDev = process.env.NODE_ENV === "development";
export type CookieStore = Awaited<ReturnType<typeof cookies>>;
export const cookieOptions: Options = {
  path: "/",
  domain: isDev ? "localhost" : ".yzlab.ru",
  sameSite: "none",
  secure: true,
  httpOnly: false,
};
