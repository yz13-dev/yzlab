import Footer from "@/components/footer";
import Header from "@/components/header/header";
import { showEmailSubscribe } from "@yzlab/flags";
import { Suspense } from "react";
import EmailSubcribe from "./components/email-subcribe";
import OgRecentSection, { SectionSkeleton as OgRecentSectionSkeleton } from "./components/sections/recent-og-section";
import SiteRecentSection, { SectionSkeleton as SiteRecentSectionSkeleton } from "./components/sections/recent-site-section";
import SpotlightedOgSection, { SectionSkeleton as SpotlightedOgSectionSkeleton } from "./components/sections/spotlighted-og-section";
import SpotlightedSiteSection, { SectionSkeleton as SpotlightedSiteSectionSkeleton } from "./components/sections/spotlighted-site-section";

export default async function () {

  const showEmail = await showEmailSubscribe()

  return (
    <>
      <Header />

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="border w-full rounded-lg flex flex-col gap-8 items-center justify-center h-96">
          <main className="flex flex-col gap-4">
            <h3 className="text-4xl font-semibold max-w-xl text-center">
              Множество сайтов, ресурсов собранны для вас.
            </h3>
            <p className="text-lg text-muted-foreground text-center">
              Сайты, ресурсы. Всё в одном месте.
            </p>
          </main>
          {
            showEmail &&
            <EmailSubcribe />
          }
        </div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <Suspense fallback={<OgRecentSectionSkeleton />}>
          <OgRecentSection />
        </Suspense>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <Suspense fallback={<SpotlightedSiteSectionSkeleton />}>
          <SpotlightedSiteSection />
        </Suspense>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <Suspense fallback={<SiteRecentSectionSkeleton />}>
          <SiteRecentSection />
        </Suspense>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <Suspense fallback={<SpotlightedOgSectionSkeleton />}>
          <SpotlightedOgSection />
        </Suspense>
      </div>

      <Footer />
    </>
  )
}
