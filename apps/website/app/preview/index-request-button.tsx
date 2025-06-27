"use client"

import { createRequest } from "@yzlab/api"
import { Button } from "@yzlab/ui/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yzlab/ui/components/dropdown-menu"
import { Separator } from "@yzlab/ui/components/separator"
import { toast } from "@yzlab/ui/components/sonner"
import { ChevronDownIcon, Loader2Icon } from "lucide-react"
import { useState } from "react"


type Props = {
  url: string
  disabled?: boolean
}
export default function ({ url, disabled = false }: Props) {

  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const sendRequest = async (type: string) => {
    setOpen(false)
    setLoading(true)
    try {
      const { data } = await createRequest({
        url,
        type,
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
    <div className="[&>button]:first:rounded-l-md *:h-9 [&>button]:last:rounded-r-md [&>button]:rounded-none flex items-center">
      <Button disabled={disabled || loading} onClick={() => sendRequest("full")} variant={disabled ? "secondary" : "default"}>
        {loading && <Loader2Icon className="animate-spin" />}
        Запросить полную индексацию
      </Button>
      <Separator orientation="vertical" />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" disabled={disabled || loading} variant={disabled ? "secondary" : "default"}>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => sendRequest("site")}>
            Индексировать только скриншот
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => sendRequest("og")}>
            Индексировать только OG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
