"use client"

import { subscribeEmail } from "@yzlab/api"
import { Button } from "@yzlab/ui/components/button"
import { Input } from "@yzlab/ui/components/input"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"


export default function () {

  const [email, setEmail] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const trySubscribe = async () => {
    setLoading(true)
    try {
      const data = await subscribeEmail({ email })
      console.log("data", data)
      if (data) {
        setSuccess(true)
      } else {
        setError("Произошла ошибка при подписке")
      }
    } catch (error) {
      console.log("error", error)
      setError("Произошла ошибка при подписке")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="user@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button variant="default" disabled={loading} onClick={trySubscribe}>
        {loading && <Loader2Icon className="animate-spin" />}
        {
          loading
            ? "Подписка..."
            : success
              ? "Подписка успешна"
              : "Подписаться"
        }
      </Button>
    </div>
  )
}
