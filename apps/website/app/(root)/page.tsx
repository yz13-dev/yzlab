import { Logo } from "@/components/logo";
import { ArrowRightIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";
import Draggable from "./components/draggable";
import Tags from "./components/tags";

export default function () {
  return (
    <>
      <header className="w-full h-16 flex items-center">
        <div className="max-w-screen-2xl w-full flex justify-between items-center mx-auto px-6">
          <div className="flex items-center gap-6">
            <Logo size={28} />
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="lg" className="font-medium text-base">Сайты</Button>
              <Button variant="ghost" size="lg" className="font-medium text-base">OG</Button>
              <Button variant="ghost" size="lg" className="font-medium text-base">Индекс</Button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 rounded-full bg-secondary" />
            <div className="size-9 border rounded-full bg-secondary" />
          </div>
        </div>
      </header>
      <div className="w-full max-w-screen-2xl mx-auto px-6 py-3 bg-background">
        <div className="flex items-center gap-2 h-9">
          <div className="flex items-center gap-2 h-9">
            <Button variant="ghost"><HeartIcon /></Button>
            <Separator orientation="vertical" />
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 rounded-full bg-secondary" />
              <div className="h-9 w-24 rounded-full bg-secondary" />
              <div className="h-9 w-24 rounded-full bg-secondary" />
            </div>
            <Separator orientation="vertical" />
          </div>
          <Draggable className="w-[calc(100%-370px)] no-scrollbar overflow-x-hidden">
            <Tags />
          </Draggable>
        </div>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full grid grid-cols-4 gap-6">

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
