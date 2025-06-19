"use server";

import { customFetch } from "@/const/fetch";
import type { Snippet } from "@/types/domains";

export async function getSnippet(id: number) {
  return customFetch<Snippet | null>(`/snippets/${id}`);
}
