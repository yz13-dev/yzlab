"use client"

import { createRequest } from "@yzlab/api/requests"
import { Button } from "@yzlab/ui/components/button"
import { toast } from "@yzlab/ui/components/sonner"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"


type Props = {
  url: string
  disabled?: boolean
}
export default function ({ url, disabled = false }: Props) {

  const [loading, setLoading] = useState<boolean>(false)

  const sendRequest = async () => {
    setLoading(true)
    try {
      const { data } = await createRequest({
        url,
        type: "site",
      });
      if (data) {
        console.log(data);
        toast("Запрос отправлен");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button disabled={disabled ?? loading} onClick={sendRequest} variant={disabled ? "secondary" : "default"}>
      {loading && <Loader2Icon className="animate-spin" />}
      Запросить индексацию
    </Button>
  )
}
