import { createClient } from "db/supabase/server"
import { cookies } from "next/headers"
import type { NewDomain, UpdateDomain } from "rest-api/types/domains"

export const getDomain = async (id: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .eq("id", id)
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

export const getDomainByDomain = async (domain: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .eq("domain", domain)
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

export const getNotCrawledDomain = async () => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .is("last_crawled_at", null)
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

export const getDomains = async () => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .order("created_at", { ascending: false })
      .not('last_crawled_at', 'is', null)
      .limit(20)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const createDomain = async (domain: string, body: NewDomain) => {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("domains")
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

export const updateDomain = async (id: string, body: UpdateDomain) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("domains")
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

export const deleteDomain = async (id: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("domains")
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
