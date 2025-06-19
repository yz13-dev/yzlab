"use client"
import { cn } from "@yzlab/ui/cn";
import { Button } from "@yzlab/ui/components/button";
import { Skeleton } from "@yzlab/ui/components/skeleton";
import { AppWindowIcon, BookMarkedIcon, ImageIcon, LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type NavLink = {
  type: "link"
  name: string;
  href: string;
  icon: React.ReactNode;
}
type NavGroup = {
  type: "group"
  name: string;
  links: NavLink[];
}

const link = (link: string, name: string, icon: React.ReactNode): NavLink => ({
  type: "link",
  name,
  href: link,
  icon
})

const group = (groupName: string, ...links: NavLink[]): NavGroup => ({
  type: "group",
  name: groupName,
  links
})

const links = [
  link("/", "Обзор", <LayoutGridIcon />),
  group("library",
    link("/site", "Сайты", <AppWindowIcon />),
    link("/og", "OG", <ImageIcon />),
  ),
  link("/indexing", "Индекс", <BookMarkedIcon />),
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

export const NavSkeleton = () => {
  return (
    <nav className="flex items-center gap-2">
      <Skeleton className="h-10 w-28" />
      <Skeleton className="h-10 w-28" />
      <Skeleton className="h-10 w-28" />
    </nav>
  )
}

export default function () {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const makeLink = (href: string) => {
    const searchString = searchParams.toString()
    if (searchString) return `${href}?${searchParams.toString()}`
    return href;
  }

  return (
    <nav className="flex items-center gap-2">
      {
        links.map(link => {

          const isGroup = link.type === "group"
          if (isGroup) {
            const groupName = link.name
            const links = link.links

            return (
              <div key={groupName} className={cn(
                "flex items-center",
                "[&>a]:rounded-none",
                "[&>a]:first:rounded-r-none [&>a]:first:rounded-l-lg",
                "[&>a]:last:rounded-l-none [&>a]:last:rounded-r-lg",
              )}>
                {
                  links.map(link => {
                    const isActive = checkPathname(pathname, link.href)
                    return (
                      <Button
                        key={link.href}
                        variant={isActive ? "default" : "ghost"}
                        size="lg"
                        className={cn(
                          "font-medium text-base border",
                          isActive ? "border-foreground" : "border-border"
                        )}
                        asChild
                      >
                        <Link
                          href={makeLink(link.href)}
                        >
                          {link.icon}
                          <span className="md:inline hidden">
                            {link.name}
                          </span>
                        </Link>
                      </Button>
                    )
                  })
                }
              </div>
            )
          }

          const isActive = checkPathname(pathname, link.href)

          return (
            <Button
              key={link.href}
              variant={isActive ? "secondary" : "ghost"}
              size="lg"
              className="font-medium text-base"
              asChild
            >
              <Link
                href={makeLink(link.href)}
              >
                {link.icon}
                <span className="md:inline hidden">
                  {link.name}
                </span>
              </Link>
            </Button>
          )
        })
      }
    </nav>
  )
}
