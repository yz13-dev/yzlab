"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "ui/components/button";

const links = [
  { name: "Обзор", href: "/" },
  { name: "Сайты", href: "/site" },
  { name: "OG", href: "/og" },
  { name: "Индекс", href: "/index" },
]

const checkPathname = (pathname: string, href: string) => {
  const hrefIsRoot = href === "/"
  if (hrefIsRoot) {
    if (pathname === href) {
      return true
    }
  } else {
    if (pathname.startsWith(href)) {
      return true
    }
    return false
  }
}

export default function () {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-2">
      {
        links.map(link => {

          const isActive = checkPathname(pathname, link.href)

          return (
            <Button
              key={link.href}
              variant={isActive ? "secondary" : "ghost"}
              size="lg"
              className="font-medium text-base"
              asChild
            >
              <Link href={link.href}>
                {link.name}
              </Link>
            </Button>
          )
        })
      }
    </nav>
  )
}
