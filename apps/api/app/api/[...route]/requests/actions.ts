import type { Requests } from "@yzlab/api/types/requests"
import { createClient } from "@yzlab/supabase/supabase/server"
import { cookies } from "next/headers"
import { createDomain, getDomainByDomain } from "../domains/actions"
import { createLink, getLinkByDomainAndPathname } from "../links/actions"



export const getRequest = async (id: number) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("index-requests")
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

export const getRequestByLink = async (link: string) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("index-requests")
      .select("*")
      .eq("url", link)
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

export const getRequests = async () => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("index-requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}


export const deleteRequest = async (id: number) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("index-requests")
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


export const createFromRequest = async (request: Requests) => {
  try {
    const domain = new URL(request.url).host;
    const title = request.name;
    const description = request.description;

    const type = request.type;

    const existedDomain = await getDomainByDomain(domain);
    if (!existedDomain) {
      const newDomain = await createDomain(domain, {
        domain,
        title,
        description,
        tags: [type],
      });

      console.log("domain id:", newDomain?.id);

      if (!newDomain) throw new Error("Domain not created");
    } else {
      const url = new URL(request.url);

      const domain = url.host
      const pathname = url.pathname

      const link = await getLinkByDomainAndPathname(domain, pathname)

      if (!link) {
        const newLink = await createLink(domain, {
          domain,
          pathname,
          title,
          description,
          tags: [type],
        })

        console.log("link id:", newLink?.id);

        if (!newLink) throw new Error("Domain not created");

      }
    }
  } catch (error) {
    console.log(error)
    return null;
  }
}
