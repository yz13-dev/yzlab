import { Logo } from "@/components/logo";
import dark from "@/public/bg/dark.png";
import light from "@/public/bg/light.png";
import Image from "next/image";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";

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
      <main className="flex flex-col justify-center max-w-4xl w-full mx-auto px-6 h-dvh">
        <Logo size={32} type="full" />
        <div className="space-y-3 *:block mt-6 mb-10 max-w-xl">
          <h1 className="text-4xl font-semibold">
            Библиотека веб-приложений, сайтов и сервисов
          </h1>
          <p className="text-lg text-muted-foreground">
            Проходите, распологайтесь чувствуйте себя как дома.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="yz13@yzlab.ru"
            className="bg-background max-w-xs"
          />
          <Button variant="secondary">Присоединиться</Button>
        </div>
      </main>
    </>
  );
}
