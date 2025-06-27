import { makeLink } from "@/lib/make-a-link";
import { SitesItem } from "@yzlab/api/types";
import { Badge } from "@yzlab/ui/components/badge";
import { Skeleton } from "@yzlab/ui/components/skeleton";
import { parseISO } from "date-fns";
import { differenceInDays } from "date-fns/fp";
import { BookmarkIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CardImage from "./card-image";


type Props = {
  link: SitesItem;
  hideImage?: boolean;
}

export default function ({ link, hideImage = false }: Props) {

  const favicon = link.favicon;

  const domain = link.domain;

  const title = link.title;
  const description = link.description;
  const image = link.screenshot;

  const blurDataURL = link.blurImageURL;

  const createdAt = link.created_at ? parseISO(link.created_at) : new Date();

  const wasCreatedMoreThanTwoDays = differenceInDays(createdAt, new Date()) > 2;

  const domainLink = makeLink(link);

  return (
    <div className="w-full h-full flex flex-col gap-2 relative">
      <div className="flex items-center justify-between">
        <div className="w-fit items-center flex gap-2">
          {
            favicon
              ? <Image src={favicon} className="shrink-0" width={20} height={20} alt={domain} />
              : <div className="size-5 shrink-0 rounded-full bg-secondary" />
          }
          <span className="text-sm text-foreground line-clamp-1 font-medium">
            {title}
          </span>
        </div>
        <div className="w-fit hidden items-center gap-2">
          <button
            type="button"
            className="size-5 rounded-full flex items-center justify-center hover:bg-secondary"
          >
            <BookmarkIcon size={14} />
          </button>
          <button
            type="button"
            className="size-5 rounded-full flex items-center justify-center hover:bg-secondary"
          >
            <PlusIcon size={14} />
          </button>
        </div>
      </div>
      <span className="text-xs text-muted-foreground line-clamp-1">
        {description ?? "Нет описания"}
      </span>
      {
        !hideImage &&
        <>
          {
            !wasCreatedMoreThanTwoDays &&
            <Badge variant="secondary" className="absolute top-14 -right-3 rotate-[30deg] z-30">Новое</Badge>
          }
          <div className="group/image aspect-[16/10] w-full overflow-hidden rounded-md border relative">
            <Link href={domainLink} className="absolute indent-0 w-full h-full z-30" />
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
          </div>
        </>
      }
    </div>
  );
}

export const CardSkeleton = ({ hideImage = false }: { hideImage?: boolean }) => {
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
      {
        !hideImage &&
        <Skeleton className="aspect-[16/10] w-full rounded-md border" />
      }
    </div>
  )
}
