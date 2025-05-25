import { createAdminClient } from "db/supabase/admin";
import { cookies } from "next/headers";
import type { NewDomain, NewLink } from "rest-api/types/domains";

export async function writeInDomains(domain: NewDomain) {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("domains")
      .insert({
        domain: domain.domain,
        description: domain.description ?? "",
        title: domain.title ?? "",
        favicon: domain.favicon,
        tags: domain.tags,
        last_crawled_at: null,
      })
      .select("*");

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}

export async function writeInLinks(link: NewLink) {
  try {
    if (!link.pathname || link.pathname === "/")
      throw new Error("Invalid pathname");

    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("links")
      .insert({
        domain: link.domain,
        description: link.description ?? "",
        title: link.title ?? "",
        pathname: link.pathname,
        last_crawled_at: null,
      })
      .select("*");

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}
