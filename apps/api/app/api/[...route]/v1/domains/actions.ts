import { CreateDomainSchema, UpdateDomainSchema } from "@/schemas"
import { createClient } from "@yzlab/supabase/supabase/server"
import { cookies } from "next/headers"

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

export const getDomainByDomain = async (domain?: string) => {

  if (!domain) return null;

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
    return [];
  }
}

export const createDomain = async (domain: string, body: CreateDomainSchema) => {
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

export const updateDomain = async (id: string, body: UpdateDomainSchema) => {
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
