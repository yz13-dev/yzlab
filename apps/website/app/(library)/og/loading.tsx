import Header from "@/components/header/header";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { CardSkeleton } from "../components/og-card";


export default function () {

  const cards = Array.from({ length: 12 }, (_, i) => i)

  return (
    <>
      <Header />

      {/* <FiltersSkeleton /> */}

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">

          {
            cards.map(link => {
              return <CardSkeleton key={link} />
            })
          }

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
