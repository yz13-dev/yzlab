"use client"
import Draggable from "@/components/draggable";
import Tags from "@/components/tags";
import { HeartIcon, MoonIcon, PaletteIcon, SunIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";


export default function () {
  const [theme, setTheme] = useQueryState("theme")

  const changeTheme = (newTheme: string) => {
    if (newTheme === theme) setTheme(null)
    else setTheme(newTheme)
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-6 py-3 bg-background">
      <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 lg:h-9 h-fit">
        <div className="flex items-center gap-2 lg:w-[395px] md:w-fit sm:w-fit w-full justify-between h-9">
          <Button variant="ghost"><HeartIcon /></Button>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <Button
              variant={theme === "light" ? "default" : "ghost"}
              onClick={() => changeTheme("light")}
            >
              <SunIcon />
              <span className="">Светлые</span>
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "ghost"}
              onClick={() => changeTheme("dark")}
            >
              <MoonIcon />
              <span className="">Тёмные</span>
            </Button>
            <Button
              variant={theme === "color" ? "default" : "ghost"}
              onClick={() => changeTheme("color")}
            >
              <PaletteIcon />
              <span className="">Цветные</span>
            </Button>
          </div>
          <Separator orientation="vertical" />
        </div>
        <Draggable
          className="lg:w-[calc(100%-370px)] w-full no-scrollbar overflow-x-hidden"
        >
          <Tags />
        </Draggable>
      </div>
    </div>
  )
}
