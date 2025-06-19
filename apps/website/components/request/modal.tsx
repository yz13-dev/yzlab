"use client"
import { createRequest } from "@yzlab/api/requests";
import { Button } from "@yzlab/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@yzlab/ui/components/dialog";
import { Input } from "@yzlab/ui/components/input";
import { toast } from "@yzlab/ui/components/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@yzlab/ui/components/tabs";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";


type Props = {
  children?: React.ReactNode
}

const isURLValid = (url: string) => url.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/);

export default function ({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const [type, setType] = useState<"site" | "og">("site");

  const [url, setUrl] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const disabled = !url || !isURLValid(url);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: res } = await createRequest({
        url,
        type,
        name,
        description,
        email,
      });
      if (res) {
        console.log(res);
        setOpen(false);
        toast("Запрос отправлен");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      clearForm();
    }
  }

  const clearForm = () => {
    setUrl("");
    setName("");
    setDescription("");
    setEmail("");
  }

  return (
    <Dialog open={loading ? true : open} onOpenChange={setOpen}>
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
            <TabsTrigger value="site">Сайт</TabsTrigger>
            <TabsTrigger value="og">OG</TabsTrigger>
          </TabsList>
          <TabsContent value="site">
            <div className="flex flex-col gap-1.5">
            </div>
            <div className="py-3 space-y-3">
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Название
                </span>
                <Input
                  placeholder="YZ13"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Описание сайта
                </span>
                <Input
                  placeholder="Сайт-портфолио"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Ссылка на сайт
                </span>
                <Input
                  placeholder="https://yz13.ru"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Почта (необязательно)
                </span>
                <Input
                  placeholder="bla-bla@example.ru"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="og">
            <div className="py-3">
              <div className="space-y-1.5">
                <span className="text-sm block font-medium text-muted-foreground">
                  Ссылка
                </span>
                <Input
                  placeholder="https://domain.com"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="mr-auto" disabled={loading}>
              Отмена
            </Button>
          </DialogClose>
          <Button disabled={disabled} onClick={handleSubmit}>
            {
              loading && <Loader2Icon className="animate-spin" />
            }
            Отправить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
