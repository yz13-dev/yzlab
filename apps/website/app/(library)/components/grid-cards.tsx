import { getRootLinks, getRootLinksWithOgs } from "@yzlab/api/links";
import AutoGrid from "./auto-grid";
import { CardSkeleton as OgCardSkeleton } from "./og-card";
import { CardSkeleton as SiteCardSkeleton } from "./site-card";

export default async function GridCards({ type = "site" }: { type: "og" | "site" }) {

  const { data } = type === "site" ? await getRootLinks(true) : await getRootLinksWithOgs(true)

  const links = data ?? []

  return <AutoGrid defaultLinks={links} type={type} />

}

export function GridCardsSkeleton({ type = "site" }: { type: "og" | "site" }) {

  const cards = Array.from({ length: 12 }, (_, i) => i)

  return cards.map(link => {
    if (type === "site") return <SiteCardSkeleton key={link} />
    return <OgCardSkeleton key={link} />
  })
}
