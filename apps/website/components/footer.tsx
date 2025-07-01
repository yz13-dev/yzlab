import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

export default function () {
  return (
    <footer className="w-full max-w-screen-2xl mx-auto">
      <div className="w-full grid md:grid-cols-3 grid-cols-1 *:p-6">
        <div className="w-full h-full flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-3 min-h-64">
            <Logo size={28} type="full" />
            <span className="text-lg text-muted-foreground">
              Сайты, ресурсы. Всё в одном месте.
            </span>
          </div>
          <div className="space-y-1.5 mt-auto *:block">
            <span className="text-xs text-muted-foreground">
              Проект <Link href="https://yz13.ru" className="text-foreground hover:underline font-medium">YZ13</Link>
            </span>
            <span className="text-xs text-muted-foreground">
              Есть вопросы? Напишите нам по email <Link href="mailto:yz13@yz13.ru" className="text-foreground hover:underline">yz13@yz13.ru</Link>
            </span>
          </div>
        </div>
        <div className="w-full h-full col-span-2">
          <div className="w-full lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-3">
            <div className="w-full h-fit space-y-1.5">
              <span className="text-sm block font-medium text-foreground">Обзор</span>
              <ul className="h-fit *:h-8 w-full *:flex *:items-center">
                <li>
                  <Link href="/og" className="text-sm text-muted-foreground flex items-center gap-2">
                    Сайты
                    <ExternalLink size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="/site" className="text-sm text-muted-foreground flex items-center gap-2">
                    Og
                    <ExternalLink size={14} />
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className="w-full h-full bg-secondary" /> */}
            {/* <div className="w-full h-full bg-secondary" /> */}
            {/* <div className="w-full h-full bg-secondary" /> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
