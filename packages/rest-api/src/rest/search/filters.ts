import { customFetch } from "@/const/fetch";
import type { SearchFilters } from "@/types/filters";

export async function getFilters() {
  return customFetch<SearchFilters>("/filters");
}
