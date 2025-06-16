import Header from "@/components/header";
import { ArrowRightIcon, BookmarkIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getRootLinksWithOgs } from "rest-api/links";
import Filters, { FiltersSkeleton } from "../components/filters";

export default async function () {

  const { data } = await getRootLinksWithOgs()

  const links = data ?? [];

  return (
    <>
      <Header />

      <Suspense fallback={<FiltersSkeleton />}>
        <Filters />
      </Suspense>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">

          {
            links.map(link => {
              const linkId = link.id;
              const favicon = link.favicon;

              const domain = link.domain;

              const title = link.title;
              const description = link.description;
              const og = link.og;

              return (
                <div key={linkId} className="w-full h-full flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="w-fit items-center flex gap-2">
                      {
                        favicon
                          ? <Image src={favicon} width={20} height={20} alt={domain} />
                          : <div className="size-5 rounded-full bg-secondary" />
                      }
                      <span className="text-sm line-clamp-1 text-foreground font-medium">{title}</span>
                    </div>
                    <div className="w-fit items-center flex gap-2">
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
                  <div className="aspect-[600/320] w-full overflow-hidden rounded-md border relative">
                    {
                      og &&
                      <Image src={og} fill className="object-cover" alt="" />
                    }
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
      <footer className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="flex items-center gap-2 *:w-1/3 justify-between w-full">
          <span className="text-sm text-start text-muted-foreground">Build with Love by YZ13</span>
          <span className="text-sm text-center text-muted-foreground">©2025 YZ13</span>
          <Link
            href="https://yz13.ru"
            className="text-sm text-muted-foreground justify-end inline-flex items-center gap-1"
          >
            YZ13
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </footer>
    </>
  )
}
