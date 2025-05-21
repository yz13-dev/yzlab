import { Logo } from "@/components/logo";
import dark from "@/public/bg/dark.png";
import light from "@/public/bg/light.png";
import Image from "next/image";

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
      <div className="flex gap-8 flex-col items-center justify-center h-dvh">
        <Logo size={42} type="full" />
      </div>
    </>
  );
}
