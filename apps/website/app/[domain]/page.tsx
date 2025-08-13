import { increaseClicks } from "@yzlab/api"
import { redirect } from "next/navigation"


type PageProps = {
  params: Promise<{
    domain: string
  }>
  searchParams: Promise<{
    path: string
  }>
}
export default async function ({ params, searchParams }: PageProps) {
  const { domain } = await params;
  const { path } = await searchParams;

  await increaseClicks({ domain, path })

  const url = `https://${domain}${path ? path : "/"}`

  return redirect(url)
}
