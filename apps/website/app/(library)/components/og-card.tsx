import { BookmarkIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import type { DomainLinkWithBlur } from "rest-api/types/domains";
import { Skeleton } from "ui/components/skeleton";
import CardImage from "./card-image";



type Props = {
  link: DomainLinkWithBlur;
}

export default function ({ link }: Props) {

  const favicon = link.favicon;

  const domain = link.domain;

  const title = link.title;
  const description = link.description;
  const image = link.og;

  const blurDataURL = link.blurImageURL;

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="w-fit items-center flex gap-2">
          {
            favicon
              ? <Image src={favicon} className="shrink-0" width={20} height={20} alt={domain} />
              : <div className="size-5 shrink-0 rounded-full bg-secondary" />
          }
          <span className="text-sm line-clamp-1 text-foreground font-medium">{title}</span>
        </div>
        <div className="w-fit hidden items-center gap-2">
          <button type="button" className="size-5 rounded-full flex items-center justify-center hover:bg-secondary">
            <BookmarkIcon size={14} />
          </button>
          <button type="button" className="size-5 rounded-full flex items-center justify-center hover:bg-secondary">
            <PlusIcon size={14} />
          </button>
        </div>
      </div>
      <span className="text-xs line-clamp-1 text-muted-foreground">
        {description ?? "Нет описания"}
      </span>
      <div className="group/image aspect-[600/320] w-full overflow-hidden rounded-md border relative">
        {/* <Suspense fallback={<Skeleton className="w-full h-full" />}> */}
        {
          image &&
          <CardImage
            src={image}
            blurDataURL={blurDataURL ?? undefined}
            className="object-cover"
            fill
            alt=""
          />
        }
        {/* </Suspense> */}
      </div>
    </div>
  )
}

export const CardSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="w-fit items-center flex gap-2">
          <div className="size-5 rounded-full bg-secondary" />
          <div className="h-5 w-16 rounded-full bg-secondary" />
        </div>
        <div className="w-fit items-center flex gap-2">
          <div className="size-5 rounded-full bg-secondary" />
          <div className="size-5 rounded-full bg-secondary" />
        </div>
      </div>
      <div className="h-4 w-1/2 rounded-full bg-secondary" />
      <Skeleton className="aspect-[600/320] w-full rounded-md border" />
    </div>
  )
}
