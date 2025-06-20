"use server"

import { customFetch } from "@/const/fetch";
import type { DomainLinkWithBlur } from "@/types/domains";

export async function getLinkByDomainAndPathname(domain: string, pathname: string) {
  const path = `/links/${domain}?pathname=${pathname}`
  return await customFetch<DomainLinkWithBlur | null>(path)
}

export async function getRootLinks(blur?: boolean, offset?: number) {

  const searchParams = new URLSearchParams();

  if (typeof blur === "boolean") {
    searchParams.set("blur", blur.toString())
  }
  if (typeof offset === "number") {
    searchParams.set("offset", offset.toString())
  }

  const path = `/links/sites?${searchParams.toString()}`

  return await customFetch<DomainLinkWithBlur[]>(path)
}

export async function getRootLinksWithOgs(blur?: boolean, offset?: number) {

  const searchParams = new URLSearchParams();

  if (typeof blur === "boolean") {
    searchParams.set("blur", blur.toString())
  }
  if (typeof offset === "number") {
    searchParams.set("offset", offset.toString())
  }

  const path = `/links/ogs?${searchParams.toString()}`

  return await customFetch<DomainLinkWithBlur[]>(path)
}


export async function getRecentSites() {
  return await customFetch<DomainLinkWithBlur[]>("/links/sites/recent")
}

export async function getRecentOgs() {
  return await customFetch<DomainLinkWithBlur[]>("/links/ogs/recent")
}

export async function getSitesByTag(tag: string) {
  return await customFetch<DomainLinkWithBlur[]>(`/links/sites/tag/${tag}`)
}

export async function getOgsByTag(tag: string) {
  return await customFetch<DomainLinkWithBlur[]>(`/links/ogs/tag/${tag}`)
}
