import Header from "@/components/header";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Filters from "../components/filters";

export default function () {
  return (
    <>
      <Header className="h-16 border-x bg-secondary/40" />

      <Filters
        className="sticky top-0 border-x border-b bg-secondary/40 rounded-b-xl backdrop-blur-3xl"
      />

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">

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
