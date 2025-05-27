import { createAdminClient } from "db/supabase/admin";
import { createClient } from "db/supabase/server";
import { cookies } from "next/headers";
import type {
  Domain,
  DomainLink,
  NewDomain,
  NewLink,
  NewSnippet,
  UpdateDomain,
  UpdateLink,
  UpdateSnippet,
} from "rest-api/types/domains";
import { addDays } from "date-fns";

export async function getOldIndexedDomain(): Promise<{
  data: Domain | null;
  error: Error | null;
}> {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const weekBack = addDays(new Date(), -7);

    const { data, error } = await client
      .from("domains")
      .select("*")
      .neq("last_crawled_at", null)
      .lte("last_crawled_at", weekBack.toISOString())
      .limit(1)
      .maybeSingle();

    return { data: data ?? null, error };
  } catch (error) {
    console.error(error);
    return { error: error as Error, data: null };
  }
}

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
      .limit(1)
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

export async function getLink(domain: string, pathname: string) {
  try {
    const cookieStore = await cookies();
    const client = createClient(cookieStore);

    const { data, error } = await client
      .from("links")
      .select("*")
      .eq("domain", domain)
      .eq("pathname", pathname)
      .maybeSingle();

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSnippet(id: number) {
  try {
    const cookieStore = await cookies();
    const client = createClient(cookieStore);

    const { data, error } = await client
      .from("snippets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
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
        last_crawled_at: domain.last_crawled_at,
      })
      .select("*")
      .maybeSingle();

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
        last_crawled_at: link.last_crawled_at,
      })
      .select("*")
      .maybeSingle();

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}

export async function updateInDomains(domainId: string, domain: UpdateDomain) {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("domains")
      .update({
        description: domain.description ?? "",
        title: domain.title ?? "",
        favicon: domain.favicon,
        tags: domain.tags,
        last_crawled_at: domain.last_crawled_at,
      })
      .eq("domain", domainId)
      .select("*")
      .maybeSingle();

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}

export async function updateInLinks(id: number, link: UpdateLink) {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("links")
      .update({
        description: link.description ?? "",
        title: link.title ?? "",
        pathname: link.pathname,
        last_crawled_at: link.last_crawled_at,
      })
      .eq("id", id)
      .select("*")
      .maybeSingle();

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}

export async function createOrUpdateDomain(domain: NewDomain) {
  try {
    const { data, error } = await writeInDomains({
      description: domain.description ?? "",
      title: domain.title ?? "",
      favicon: domain.favicon,
      tags: domain.tags,
      last_crawled_at: new Date().toISOString(),
      domain: domain.domain,
    });

    console.log("Domain indexed", data?.domain);

    if (error) throw new Error("Domain index failed");

    return data;
  } catch (err) {
    console.log(err);
    const { data, error } = await updateInDomains(domain.domain, {
      description: domain.description ?? "",
      title: domain.title ?? "",
      favicon: domain.favicon,
      tags: domain.tags,
      last_crawled_at: new Date().toISOString(),
      domain: domain.domain,
    });

    console.log("Domain index updated", data?.domain);

    if (error) return null;

    return data;
  }
}
export async function createOrUpdateLink(link: NewLink) {
  try {
    const fetchedLink = await getLink(link.domain, link.pathname);

    if (fetchedLink === null) throw new Error("Link does not exist");

    const { data, error } = await updateInLinks(fetchedLink.id, {
      description: link.description ?? "",
      title: link.title ?? "",
      pathname: link.pathname,
      last_crawled_at: new Date().toISOString(),
      domain: link.domain,
    });

    console.log("Link index updated", data?.domain, data?.pathname);

    if (error) return null;

    return data;
  } catch (err) {
    console.log(err);
    const { data, error } = await writeInLinks({
      description: link.description ?? "",
      title: link.title ?? "",
      pathname: link.pathname,
      last_crawled_at: new Date().toISOString(),
      domain: link.domain,
    });

    console.log("Link indexed", data?.domain, data?.pathname);

    if (error) throw new Error("Link index failed");

    return data;
  }
}

export async function writeInSnippets(snippet: NewSnippet) {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("snippets")
      .insert({
        code: snippet.code,
        language: snippet.language,
        domain: snippet.domain,
      })
      .select("*")
      .maybeSingle();

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}

export async function updateInSnippets(id: number, snippet: UpdateSnippet) {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("snippets")
      .update({
        code: snippet.code,
        language: snippet.language,
      })
      .eq("id", id)
      .select("*")
      .maybeSingle();

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}

export async function clearSnippets(domain: string) {
  try {
    const cookieStore = await cookies();
    const client = createAdminClient(cookieStore);

    const { data, error } = await client
      .from("snippets")
      .delete()
      .eq("domain", domain)
      .select();

    return { data, error };
  } catch (error) {
    console.error(error);
    return { error, data: null };
  }
}
