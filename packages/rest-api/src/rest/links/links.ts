"use server"

import { customFetch } from "@/const/fetch";
import type { DomainLinkWithBlur } from "@/types/domains";



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
