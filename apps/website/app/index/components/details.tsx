import { format, parseISO } from "date-fns";
import Image from "next/image";
import { getDomain } from "rest-api/domains";
import { Skeleton } from "ui/components/skeleton";

async function fetchMetadata(url: string) {
  try {

    const api = new URL("crawl", "http://localhost:3000");
    const searchParams = api.searchParams;
    searchParams.set("url", url);
    searchParams.set("preset", "og")

    const response = await fetch(api.toString(), {
      method: "POST",
    });
    const json = await response.json();

    return json;
  } catch {
    return null;
  }
}

export const DetailsSkeleton = () => {
  return (
    <div className="w-full col-span-2 space-y-2 py-2">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Домен</span>
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Статус</span>
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Созданно</span>
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Название</span>
        <div className="flex items-center gap-1">
          <Skeleton className="size-4" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Описание</span>
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Тэги</span>
        <div className="flex items-center gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}

export default async function ({ host, url }: { url: string, host: string }) {

  const metadata = await fetchMetadata(url);

  const { data: domain } = await getDomain(host);

  const createdAt = domain?.created_at ? parseISO(domain.created_at) : null;
  const tags = domain?.tags ?? [];

  const title = metadata?.title
  const description = metadata?.description ?? "Без описания"

  const favicon = metadata?.favicon;

  return (
    <div className="w-full col-span-2 space-y-2 py-2">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Домен</span>
        <span className="text-sm text-foreground">{host}</span>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Статус</span>
          <span className="text-sm text-foreground">
            {
              domain ? "Отслеживается" : "Не отслеживается"
            }
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Созданно</span>
          <span className="text-sm text-foreground">
            {
              createdAt ?

                format(createdAt, "dd.MM.yyyy")
                : "-"
            }
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Название</span>
        <div className="flex items-center gap-1">
          {
            favicon &&
            <Image src={favicon} alt="Favicon" width={16} height={16} />
          }
          <span className="text-sm text-foreground">{title}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Описание</span>
        <span className="text-sm text-foreground">{description}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Тэги</span>
        <span className="text-sm text-foreground">{tags.length}</span>
      </div>
    </div>
  )
}
