import OgCard, { CardSkeleton } from "@/app/(library)/components/og-card";
import { getRecentOgs } from "@yzlab/api";
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

  const response = await getRecentOgs()

  const links = response.data ?? [];

  return (
    <BigSection title="Новые OG">
      {
        links.map(link => {
          const linkId = link.id;
          return <OgCard key={linkId} link={link} />
        })
      }
    </BigSection>
  )
}
