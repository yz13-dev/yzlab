import { getIndexingPreview } from "@yzlab/api/indexing";
import { getLinkByDomainAndPathname } from "@yzlab/api/links";
import { getRequestByLink } from "@yzlab/api/requests";
import { cn } from "@yzlab/ui/cn";
import { Badge } from "@yzlab/ui/components/badge";
import { Skeleton } from "@yzlab/ui/components/skeleton";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { CheckIcon, ImageIcon, Loader2Icon, TimerIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import CardImage from "../(library)/components/card-image";
import IndexRequestButton from "./index-request-button";
import UrlInput from "./url-input";



type PageProps = {
  searchParams: Promise<{
    url: string;
  }>
}

export default async function ({ searchParams }: PageProps) {
  const { url } = await searchParams;

  if (!url) return (
    <div className="w-full px-6 py-12 max-w-6xl mx-auto">
      <UrlInput defaultValue={url} />
    </div>
  )

  const { data: preview } = await getIndexingPreview(url.toString())

  const domain = preview?.domain;
  const pathname = preview?.pathname;

  if (!domain || !pathname) return null;

  const [{ data: link }, { data: request }] = await Promise.all([getLinkByDomainAndPathname(domain, pathname), getRequestByLink(url.toString())])

  const requested = !!request

  const createdAt = link ? parseISO(link.created_at) : null

  const favicon = preview?.favicon;

  const screenshot = preview?.screenshot ? `data:image/png;base64,${Buffer.from(preview?.screenshot).toString('base64')}` : null

  const og = preview?.og;

  const sameOgUrl = og && link?.og && og === link?.og;

  const image = link?.screenshot;

  const blurDataURL = link?.blurImageURL;

  const tags = link?.tags ?? [];

  return (
    <>
      <div className="w-full px-6 py-12 max-w-6xl mx-auto flex items-center justify-between">
        <UrlInput defaultValue={url} />
        {
          !link &&
          <IndexRequestButton url={url} disabled={requested} />
        }
      </div>
      <Suspense fallback={
        <>
          <Skeleton className="w-full max-w-6xl mx-auto h-80" />
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-3 grid-cols-1 mt-6">
            <div className="w-full grid grid-cols-1 gap-4 col-span-1">
              <Skeleton className="w-full aspect-[600/320]" />
              <Skeleton className="w-full aspect-[600/400]" />
            </div>
          </div>
        </>
      }>
        <div className="w-full max-w-6xl mx-auto">
          <div className=" divide-y *:p-4 *:border-x *:first:rounded-t-3xl *:last:rounded-b-3xl *:first:border-t *:last:border-b">
            <div className="w-full grid gap-3 md:grid-cols-3 grid-cols-1 bg-card">
              <div className="w-full h-full aspect-[600/400] border bg-background rounded-lg overflow-hidden relative flex items-center justify-center">
                {
                  screenshot
                    ?
                    <Image
                      className="object-cover"
                      src={screenshot}
                      fill
                      alt=""
                    />
                    : <ImageIcon size={24} className="text-muted-foreground" />
                }
              </div>
              <div className="w-full space-y-3 col-span-2 *:w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Название</span>
                  <div className="flex items-center gap-2">
                    {
                      favicon
                        ? <Image width={20} height={20} src={favicon} alt="" />
                        : <div className="size-5 rounded-full bg-secondary" />
                    }
                    <h1 className="text-sm font-medium text-foreground">{preview?.title}</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Описание</span>
                  <p className="text-sm font-medium text-foreground">{preview?.description}</p>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Статус</span>
                    <span className="text-sm font-medium text-foreground flex items-center gap-1">
                      {
                        requested ? <Loader2Icon size={14} className="animate-spin" /> :
                          link ? <CheckIcon size={14} /> : <XIcon size={14} />
                      }
                      {
                        requested ? "Запрошена ндекксация" :
                          link ? "Проиндексирован" : "Не проиндексирован"
                      }
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Создано</span>
                    <span className="text-sm font-medium text-foreground flex items-center gap-1">
                      <TimerIcon size={14} />
                      {createdAt ? format(createdAt, "dd MMMM yyyy", { locale: ru }) : "Не создано"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Тэги</span>
                  <div className="flex flex-wrap gap-1 items-start">
                    {
                      tags.length >= 1
                        ? tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)
                        :
                        <span className="text-sm font-medium text-foreground">
                          Нет тэгов
                        </span>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "size-5 rounded-full flex items-center justify-center text-background",
                  link ? "bg-foreground" : "bg-secondary"
                )}>
                  {
                    link ? <CheckIcon size={14} /> : <XIcon size={14} />
                  }
                </div>
                <span className="text-sm text-muted-foreground">{link ? "Проиндексирован" : "Не проиндексирован"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "size-5 rounded-full flex items-center justify-center text-background",
                  screenshot ? "bg-foreground" : "bg-secondary"
                )}>
                  {
                    screenshot ? <CheckIcon size={14} /> : <XIcon size={14} />
                  }
                </div>
                <span className="text-sm text-muted-foreground">{screenshot ? "Есть скриншот" : "Нет скриншота"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "size-5 rounded-full flex items-center justify-center text-background",
                  og ? "bg-foreground" : "bg-secondary"
                )}>
                  {
                    og ? <CheckIcon size={14} /> : <XIcon size={14} />
                  }
                </div>
                <span className="text-sm text-muted-foreground">OG</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-3 grid-cols-1 mt-6">
          <div className="w-full grid grid-cols-1 gap-4 col-span-1 *:bg-card *:rounded-xl *:border">
            <div className="w-full aspect-[600/320] overflow-hidden relative flex items-center justify-center">
              <Badge variant="secondary" className="absolute top-3 left-3 z-20">
                {link ? sameOgUrl ? "Совпадает с индексированным" : "Не совпадает с индексированным" : "Не проиндексирован"}
              </Badge>
              {
                og ?
                  <Image
                    className="object-cover"
                    src={og}
                    fill
                    alt=""
                  />
                  : <ImageIcon size={24} className="text-muted-foreground" />
              }
            </div>
            <div className="w-full aspect-[600/400] relative overflow-hidden flex items-center justify-center">
              <Badge variant="secondary" className="absolute top-3 left-3 z-20">{image ? "Проиндексированный скриншот" : "Не проиндексирован"}</Badge>
              {
                image ?
                  <CardImage
                    src={image}
                    blurDataURL={blurDataURL ?? undefined}
                    className="object-cover"
                    fill
                    alt=""
                  />
                  : <ImageIcon size={24} className="text-muted-foreground" />
              }
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}
