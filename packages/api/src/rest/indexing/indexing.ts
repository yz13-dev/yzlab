import { customFetch } from "@/const/fetch";
import type { DomainFull } from "@/types/domains";

export async function getIndexRegisrty() {
  return await customFetch<DomainFull[]>("/indexing", {
    method: "GET",
  });
}

export async function getIndexRegisrtyItem(domain: string) {
  const path = `/indexing/${domain}`;
  return await customFetch<DomainFull | null>(path, {
    method: "GET",
  });
}
