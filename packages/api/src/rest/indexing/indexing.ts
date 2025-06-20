import { customFetch } from "@/const/fetch";
import type { DomainFull, DomainLinkWithBufferScreenshot } from "@/types/domains";

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

export async function getIndexingPreview(url: string) {
  const path = `/indexing/preview?url=${url}`;
  return await customFetch<DomainLinkWithBufferScreenshot | null>(path, {
    method: "POST",
  });
}
