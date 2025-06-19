import { cn } from "@yzlab/ui/cn";
import { Suspense } from "react";
import { Logo } from "../logo";
import LogoBoxLine from "../logo-box-line";
import Nav, { NavSkeleton } from "../nav";
import Actions, { ActionsSkeleton } from "./actions";


type Props = {
  className?: string
}
export default function ({ className = "" }: Props) {
  return (
    <>
      <LogoBoxLine />
      <header className="w-full h-16 flex items-center">
        <div className={cn(
          "max-w-screen-2xl w-full flex justify-between items-center mx-auto px-6",
          className
        )}>
          <div className="flex items-center lg:w-fit w-[calc(100%-56px)] md:gap-6 gap-3">
            <div
              id="logo-box"
              className="h-10 bg-secondary rounded-r-lg border-r border-y flex items-center pl-2 pr-3"
            >
              <Logo size={28} className="shrink-0" />
            </div>
            <Suspense fallback={<NavSkeleton />}>
              <Nav />
            </Suspense>
          </div>
          <Suspense fallback={<ActionsSkeleton />}>
            <Actions />
          </Suspense>
        </div>
      </header>
    </>
  )
}
