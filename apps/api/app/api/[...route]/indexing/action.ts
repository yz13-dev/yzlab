import { createAdminClient } from "db/supabase/admin";
import { cookies } from "next/headers";
import type {
  Domain,
  NewDomain,
  NewLink,
  DomainLink,
} from "rest-api/types/domains";

export async function getUnIndexedDomain(): Promise<{
  data: Domain | null;
  error: Error | null;
}> {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("domains")
      .select("*")
      .is("last_crawled_at", null)
      .maybeSingle();

    return { data: data ?? null, error };
  } catch (error) {
    console.error(error);
    return { error: error as Error, data: null };
  }
}

export async function getUnIndexedLinks(domain: string): Promise<{
  data: DomainLink[];
  error: Error | null;
}> {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("links")
      .select("*")
      .is("last_crawled_at", null)
      .eq("domain", domain);

    return { data: data ?? [], error };
  } catch (error) {
    console.error(error);
    return { error: error as Error, data: [] };
  }
}

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
