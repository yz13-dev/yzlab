import OgCard, { CardSkeleton } from "@/app/(library)/components/og-card";
import { getOgsByTag } from "@yzlab/api";
import Section, { SectionSkeleton as SmallSectionSkeleton } from "../small-section";




export const SectionSkeleton = () => {

  const cards = Array.from({ length: 8 }, (_, i) => i)

  return (
    <SmallSectionSkeleton>
      {
        cards.map(card => <CardSkeleton key={card} hideImage />)
      }
    </SmallSectionSkeleton>
  )
}

export default async function () {

  const response = await getOgsByTag("spotlight")

  const links = response ?? [];

  return (
    <Section title="Новые OG">
      {
        links.map(link => {
          const linkId = link.id;
          return <OgCard key={linkId} link={link} hideImage />
        })
      }
    </Section>
  )
}
