"use server"

import { customFetch } from "@/const/fetch";
import type { DomainLinkWithBlur } from "@/types/domains";



export async function getRootLinks(blur?: boolean) {

  const searchParams = new URLSearchParams();

  if (typeof blur === "boolean") {
    searchParams.set("blur", blur.toString())
  }

  const path = `/links/sites?${searchParams.toString()}`

  return await customFetch<DomainLinkWithBlur[]>(path)
}

export async function getRootLinksWithOgs(blur?: boolean) {

  const searchParams = new URLSearchParams();

  if (typeof blur === "boolean") {
    searchParams.set("blur", blur.toString())
  }

  const path = `/links/ogs?${searchParams.toString()}`

  return await customFetch<DomainLinkWithBlur[]>(path)
}
