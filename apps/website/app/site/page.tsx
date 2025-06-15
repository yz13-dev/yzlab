import Draggable from "@/components/draggable";
import Header from "@/components/header";
import Tags from "@/components/tags";
import { ArrowRightIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";

export default function () {
  return (
    <>
      <Header />

      <div className="w-full max-w-screen-2xl mx-auto px-6 py-3 bg-background">
        <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 lg:h-9 h-fit">
          <div className="flex items-center gap-2 h-9 lg:w-fit w-full">
            <Button variant="ghost"><HeartIcon /></Button>
            <Separator orientation="vertical" />
            <div className="flex lg:w-fit w-full items-center gap-2">
              <div className="h-9 w-24 rounded-full bg-secondary" />
              <div className="h-9 w-24 rounded-full bg-secondary" />
              <div className="h-9 w-24 rounded-full bg-secondary" />
            </div>
            <Separator orientation="vertical" />
          </div>
          <Draggable className="lg:w-[calc(100%-370px)] w-full no-scrollbar overflow-x-hidden">
            <Tags />
          </Draggable>
        </div>
      </div>
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
