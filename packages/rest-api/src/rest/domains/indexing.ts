import { customFetch } from "@/const/fetch";
import type { DomainFull } from "@/types/domains";

export async function getIndexRegisrty() {
  return await customFetch<DomainFull[]>("/indexing", {
    method: "GET",
  });
}
