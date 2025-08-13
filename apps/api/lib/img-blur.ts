import { getPlaiceholder } from "plaiceholder";



export async function imgBlur(image: string) {
  try {
    const response = await fetch(image)
    const buffer = Buffer.from(await response.arrayBuffer())

    const { base64 } = await getPlaiceholder(buffer, { format: ["jpg"], size: 10 })

    return base64
  } catch (error) {
    console.error(error)
    return null
  }
}
