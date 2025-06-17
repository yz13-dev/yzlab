import { getPlaiceholder } from "plaiceholder";



export async function imgBlur(image: string) {
  console.log(image);

  const response = await fetch(image)
  const buffer = Buffer.from(await response.arrayBuffer())

  const { base64 } = await getPlaiceholder(buffer, { format: ["jpg"] })

  return base64
}
