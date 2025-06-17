import { getRootLinks, getRootLinksWithOgs } from "rest-api/links";
import OgCard, { CardSkeleton as OgCardSkeleton } from "./og-card";
import SiteCard, { CardSkeleton as SiteCardSkeleton } from "./site-card";

export default async function GridCards({ type = "site" }: { type: "og" | "site" }) {
  if (type === "site") {
    const { data } = await getRootLinks(true)

    const links = data ?? []

    return links.map(link => {
      const linkId = link.id;
      return <SiteCard key={linkId} link={link} />
    })
  }
  const { data } = await getRootLinksWithOgs(true)

  const links = data ?? []

  return links.map(link => {
    const linkId = link.id;
    return <OgCard key={linkId} link={link} />
  })
}

export function GridCardsSkeleton({ type = "site" }: { type: "og" | "site" }) {

  const cards = Array.from({ length: 12 }, (_, i) => i)

  return cards.map(link => {
    if (type === "site") return <SiteCardSkeleton key={link} />
    return <OgCardSkeleton key={link} />
  })
}
