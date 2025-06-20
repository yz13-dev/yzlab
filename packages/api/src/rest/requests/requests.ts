"use server"

import { customFetch } from "@/const/fetch";
import type { NewRequest, Request } from "@/types/requests";


export async function createRequest(body: NewRequest) {
  return await customFetch<Request | null>("/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function getRequests() {
  return await customFetch<Request[]>("/requests")
}


export async function acceptRequest(id: string) {
  return await customFetch<Request | null>(`/requests/${id}/accept`, {
    method: "POST",
  })
}

export async function rejectRequest(id: string) {
  return await customFetch<Request | null>(`/requests/${id}/reject`, {
    method: "POST",
  })
}


export async function getRequestByLink(url: string) {
  return await customFetch<Request | null>(`/requests/link?url=${url}`)
}
