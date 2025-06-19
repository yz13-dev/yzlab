import { customFetch } from "@/const/fetch";
import type { Domain } from "@/types/domains";

export async function getDomain(domain: string) {
  const path = `/domains/${domain}`;
  return await customFetch<Domain | null>(path, {
    method: "GET",
  });
}

export async function getDomains() {
  const path = "/domains";
  return await customFetch<Domain[] | null>(path, {
    method: "GET",
  });
}
