"use server"

import { customFetch } from "@/const/fetch"
import type { DomainLink } from "@/types/domains"



export async function getRootLinks() {
  return await customFetch<DomainLink[]>("/links/sites")
}

export async function getRootLinksWithOgs() {
  return await customFetch<DomainLink[]>("/links/ogs")
}
