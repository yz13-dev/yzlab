import { createClient } from "db/supabase/server"
import { cookies } from "next/headers"



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
