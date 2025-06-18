import SiteCard, { CardSkeleton } from "@/app/(library)/components/site-card";
import { getSitesByTag } from "rest-api/links";
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

  const { data } = await getSitesByTag("spotlight")

  const links = data ?? [];

  return (
    <Section title="Оторанные cайты">
      {
        links.map(link => {
          const linkId = link.id;
          return <SiteCard key={linkId} link={link} hideImage />
        })
      }
    </Section>
  )
}
