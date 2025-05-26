"use server";
import { customFetch } from "@/const/fetch";
import type { Snippet } from "@/types/domains";

export async function search(text: string, offset?: number) {
  const searchParams = new URLSearchParams();

  searchParams.set("q", text);
  if (typeof offset === "number") searchParams.set("offset", String(offset));

  return customFetch<Snippet[]>(`/search/?${searchParams.toString()}`);
}
