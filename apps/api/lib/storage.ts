import { createClient } from "db/supabase/server"
import { cookies } from "next/headers"



export const uploadScreenshot = async (domain: string, pathname: string, screenshot: Uint8Array<ArrayBufferLike> | null) => {
  try {
    if (!screenshot) throw new Error("Screenshot is null")

    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const storage = supabase.storage

    const path = `${domain}/${pathname}/screenshot.jpg`

    const { data, error } = await storage
      .from("screenshots")
      .upload(path, screenshot, { contentType: "image/jpeg", upsert: true })

    if (error) {
      console.error(error)
      throw new Error("Failed to upload screenshot")
    }

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
