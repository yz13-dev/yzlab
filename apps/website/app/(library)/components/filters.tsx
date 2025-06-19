"use client"
import Draggable from "@/components/draggable";
import Tags from "@/components/tags";
import { cn } from "@yzlab/ui/cn";
import { Button } from "@yzlab/ui/components/button";
import { Separator } from "@yzlab/ui/components/separator";
import { Skeleton } from "@yzlab/ui/components/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@yzlab/ui/components/tooltip";
import { HeartIcon, MoonIcon, PaletteIcon, SunIcon } from "lucide-react";
import { type HTMLMotionProps, motion } from "motion/react";
import { useQueryState } from "nuqs";

export const FiltersSkeleton = () => {
  return (
    <div className="max-w-screen-2xl w-full mx-auto px-6">
      <Skeleton className="h-12 w-full" />
    </div>
  )
}

type Props = HTMLMotionProps<"div">
export default function ({ className = "", ...props }: Props) {
  const [theme, setTheme] = useQueryState("theme")

  const changeTheme = (newTheme: string) => {
    if (newTheme === theme) setTheme(null)
    else setTheme(newTheme)
  }

  return (
    <motion.div
      className={cn(
        "w-full max-w-screen-2xl mx-auto px-3 py-1.5 bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 lg:h-9 h-fit">
        <div className="flex items-center gap-2 lg:w-[202px] md:w-fit sm:w-fit w-full justify-between h-9">
          <Button variant="ghost"><HeartIcon /></Button>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  onClick={() => changeTheme("light")}
                >
                  <SunIcon />
                  <span className="sr-only">Светлые</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Светлые</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={theme === "dark" ? "default" : "ghost"}
                  onClick={() => changeTheme("dark")}
                >
                  <MoonIcon />
                  <span className="sr-only">Тёмные</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Тёмные</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={theme === "color" ? "default" : "ghost"}
                  onClick={() => changeTheme("color")}
                >
                  <PaletteIcon />
                  <span className="sr-only">Цветные</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Цветные</span>
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" />
        </div>
        <Draggable
          className="lg:w-[calc(100%-202px)] w-full no-scrollbar overflow-x-hidden"
        >
          <Tags />
        </Draggable>
      </div>
    </motion.div>
  )
}
