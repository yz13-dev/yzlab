import { customFetch } from "@/const/fetch";
import type { DomainFull } from "@/types/domains";

export async function getDomain(domain: string) {
  const path = `/domains/${domain}`;
  return await customFetch<DomainFull | null>(path, {
    method: "GET",
  });
}
