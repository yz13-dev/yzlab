"use client"
import { useState } from "react";
import { Button } from "ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "ui/components/dialog";
import { Input } from "ui/components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";


type Props = {
  children?: React.ReactNode
}

export default function ({ children }: Props) {

  const [type, setType] = useState<"site" | "og">("site")

  return (
    <Dialog>
      <DialogTrigger asChild={!!children}>{children}</DialogTrigger>
      <DialogContent>
        <div className="*:block space-y-1.5">
          <DialogTitle>Запрос {type === "site" ? "сайта" : "OG"}</DialogTitle>
          <DialogDescription>
            Рассмотрим вашу заявку, после одобрения {type === "site" ? "сайта" : "OG"} появиться в течении нескольких дней.
          </DialogDescription>
        </div>
        <Tabs
          value={type}
          onValueChange={value => setType(value as "site" | "og")}
          className="w-full"
        >
          <TabsList className="w-full *:w-1/2">
            <TabsTrigger value="1">Сайт</TabsTrigger>
            <TabsTrigger value="2">OG</TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <div className="flex flex-col gap-1.5">
            </div>
            <div className="py-3 space-y-3">
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Название
                </span>
                <Input placeholder="YZ13" />
              </div>
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Описание сайта
                </span>
                <Input placeholder="Сайт-портфолио" />
              </div>
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Ссылка на сайт
                </span>
                <Input placeholder="https://yz13.ru" />
              </div>
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Почта (необязательно)
                </span>
                <Input placeholder="bla-bla@example.ru" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="2">
            <div className="py-3">
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Ссылка
                </span>
                <Input placeholder="https://domain.com" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="mr-auto">
              Отмена
            </Button>
          </DialogClose>
          <Button>Отправить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
