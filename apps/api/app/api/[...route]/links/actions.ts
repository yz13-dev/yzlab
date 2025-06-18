import { createClient } from "db/supabase/server"
import { cookies } from "next/headers"
import type { DomainLink, NewLink, UpdateLink } from "rest-api/types/domains"




export const getLink = async (id: number) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}


export const getNotCrawledLink = async () => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .or("last_crawled_at.is.null,screenshot.is.null")
      .limit(1)
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const createLink = async (domain: string, body: NewLink) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .insert({
        ...body,
        domain
      })
      .select("*")
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const getDomainLinks = async (domain: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("domain", domain)
      .limit(100)

    if (error) {
      throw new Error(error.message)
    }

    return data ?? []
  } catch (error) {
    console.log(error)
    return [];
  }
}

export const createLinks = async (body: NewLink[]): Promise<DomainLink[]> => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .insert(body)
      .select("*")

    if (error) {
      throw new Error(error.message)
    }

    return data ?? []
  } catch (error) {
    console.log(error)
    return [];
  }
}

export const updateLink = async (id: number, body: UpdateLink) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .update(body)
      .eq("id", id)
      .select("*")
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const deleteLink = async (id: number) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .delete()
      .eq("id", id)
      .select("*")
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const getLinkByDomainAndPathname = async (domain: string, pathname: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("pathname", pathname)
      .eq("domain", domain)
      .limit(1)
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const getRootLink = async (domain: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("pathname", "/")
      .eq("domain", domain)
      .limit(1)
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const getRootLinks = async (offset?: number) => {

  const step = 15;

  const range = {
    from: offset ?? 0,
    to: (offset ?? 0) + step,
  }

  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      // .eq("pathname", "/")
      .not('last_crawled_at', 'is', null)
      .not("screenshot", 'is', null)
      .order("created_at", { ascending: false })
      .range(range.from, range.to)

    if (error) {
      throw new Error(error.message)
    }
    const result = data ?? []

    return result
  } catch (error) {
    console.log(error)
    return [];
  }
}

export const getRootLinksWithOgs = async (offset?: number) => {

  const step = 15;

  const range = {
    from: offset ?? 0,
    to: (offset ?? 0) + step,
  }

  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      // .eq("pathname", "/")
      .not('og', 'is', null)
      .not('last_crawled_at', 'is', null)
      .order("created_at", { ascending: false })
      .range(range.from, range.to)

    if (error) {
      throw new Error(error.message)
    }

    const result = data ?? []

    return result
  } catch (error) {
    console.log(error)
    return [];
  }
}
