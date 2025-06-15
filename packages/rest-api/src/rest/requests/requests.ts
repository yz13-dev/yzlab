"use server"

import { customFetch } from "@/const/fetch";
import type { NewRequest } from "@/types/requests";


export async function createRequest(body: NewRequest) {
  return await customFetch<Request | null>("/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}
