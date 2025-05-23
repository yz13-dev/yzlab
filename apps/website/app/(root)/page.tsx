import { Logo } from "@/components/logo";
import dark from "@/public/bg/dark.png";
import light from "@/public/bg/light.png";
import Image from "next/image";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import SearchBar from "./components/search-bar";

export default function page() {
  return (
    <>
      <div className="w-full h-dvh absolute top-0 z-[-1] left-0">
        <div className="w-full h-full relative">
          <Image
            className="object-cover w-full h-full light-mode-image"
            src={light}
            placeholder="blur"
            fill
            alt=""
          />
          <Image
            className="object-cover w-full h-full dark-mode-image"
            src={dark}
            placeholder="blur"
            fill
            alt=""
          />
          <div className="w-full h-full absolute top-0 left-0 backdrop-grayscale bg-gradient-to-b from-background via-transparent to-background backdrop-blur-lg" />
        </div>
      </div>
      <main className="flex flex-col gap-8 items-center justify-center max-w-4xl w-full mx-auto px-6 h-dvh">
        {/* <div className="space-y-3 *:block mt-6 mb-10 max-w-xl"> */}
        {/* <h1 className="text-4xl font-semibold"></h1> */}
        {/* <p className="text-lg text-muted-foreground"></p> */}
        {/* </div> */}
        <SearchBar />
      </main>
    </>
  );
}
