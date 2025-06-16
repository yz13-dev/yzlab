import { BookmarkIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import type { DomainLink } from "rest-api/types/domains";



type Props = {
  link: DomainLink;
}

export default function ({ link }: Props) {
  const favicon = link.favicon;

  const domain = link.domain;

  const title = link.title;
  const description = link.description;
  const image = link.screenshot;

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="w-fit items-center flex gap-2">
          {favicon ? (
            <Image src={favicon} width={20} height={20} alt={domain} />
          ) : (
            <div className="size-5 rounded-full bg-secondary" />
          )}
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
      <div className="aspect-[640/400] w-full overflow-hidden rounded-md border relative">
        {
          image &&
          <Image
            src={image}
            className="object-cover"
            placeholder="blur"
            blurDataURL={image}
            fill
            alt=""
          />
        }
      </div>
    </div>
  );
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
      <div className="aspect-[640/400] w-full rounded-md border" />
    </div>
  )
}
