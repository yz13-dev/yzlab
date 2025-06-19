"use server"
import { customFetch } from "@/const/fetch"

export async function subscribeEmail(email: string) {
  return await customFetch("/email/subscribe", {
    method: "POST",
    body: email,
  })
}

export async function unsubscribeEmail(email: string) {
  return await customFetch("/email/unsubscribe", {
    method: "POST",
    body: email,
  })
}
