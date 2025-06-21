import { permanentRedirect } from "next/navigation"


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

  const route = `/${domain}?path=${path}`

  return permanentRedirect(route)
}
