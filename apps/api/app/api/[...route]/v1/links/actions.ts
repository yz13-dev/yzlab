import { CreateLinkSchema, LinkSchema, UpdateLinkSchema } from "@/schemas"
import { createClient } from "@yzlab/supabase/supabase/server"
import { formatISO, setMonth } from "date-fns"
import { cookies } from "next/headers"



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
      .is("last_crawled_at", null)
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

export const getOldCrawledLink = async () => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const currentDate = new Date()
    const monthBefore = setMonth(currentDate, currentDate.getMonth() - 1)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .not('last_crawled_at', 'is', null)
      .lte("last_crawled_at", formatISO(monthBefore))
      .order("created_at", { ascending: false })
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

export const createLink = async (domain: string, body: CreateLinkSchema) => {
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

export const createLinks = async (body: CreateLinkSchema[]): Promise<LinkSchema[]> => {
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

export const updateLink = async (id: number, body: UpdateLinkSchema) => {
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

export const getRecentSites = async () => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      // .eq("pathname", "/")
      .not('screenshot', 'is', null)
      .not('last_crawled_at', 'is', null)
      .order("created_at", { ascending: false })
      .limit(8)

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

export const getRecentOgs = async () => {
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
      .limit(8)

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

export const getSitesByTag = async (tag: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .contains("tags", [tag])
      .not('screenshot', 'is', null)
      .not('last_crawled_at', 'is', null)
      .order("created_at", { ascending: false })
      .limit(8)

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

export const getOgsByTag = async (tag: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .contains("tags", [tag])
      .not('og', 'is', null)
      .not('last_crawled_at', 'is', null)
      .order("created_at", { ascending: false })
      .limit(8)

    console.log(tag, data, error)

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


export const increaseClicks = async (id: number) => {
  try {

    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const link = await getLink(id)


    const { data, error } = await supabase.from("links").update({
      clicks: (link?.clicks ?? 0) + 1
    })
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

export const increaseClicksByDomainAndPath = async (domain: string, path: string) => {
  try {

    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const link = await getLinkByDomainAndPathname(domain, path)

    const { data, error } = await supabase.from("links").update({
      clicks: (link?.clicks ?? 0) + 1
    })
      .eq("domain", domain)
      .eq("pathname", path)
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
