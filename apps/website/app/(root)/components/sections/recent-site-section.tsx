import SiteCard, { CardSkeleton } from "@/app/(library)/components/site-card";
import { getRecentSites } from "@yzlab/api";
import BigSection, { SectionSkeleton as BigSectionSkeleton } from "../big-section";




export const SectionSkeleton = () => {

  const cards = Array.from({ length: 8 }, (_, i) => i)

  return (
    <BigSectionSkeleton>
      {
        cards.map(card => <CardSkeleton key={card} />)
      }
    </BigSectionSkeleton>
  )
}

export default async function () {

  const response = await getRecentSites()

  const links = response ?? [];

  return (
    <BigSection title="Новые Сайты">
      {
        links.map(link => {
          const linkId = link.id;
          return <SiteCard key={linkId} link={link} />
        })
      }
    </BigSection>
  )
}
