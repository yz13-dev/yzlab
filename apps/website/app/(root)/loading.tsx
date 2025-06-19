import Header from "@/components/header/header";
import { Logo } from "@/components/logo";
import { Button } from "@yzlab/ui/components/button";
import { Input } from "@yzlab/ui/components/input";
import { SectionSkeleton as OgRecentSectionSkeleton } from "./components/sections/recent-og-section";
import { SectionSkeleton as SiteRecentSectionSkeleton } from "./components/sections/recent-site-section";
import { SectionSkeleton as SpotlightedOgSectionSkeleton } from "./components/sections/spotlighted-og-section";
import { SectionSkeleton as SpotlightedSiteSectionSkeleton } from "./components/sections/spotlighted-site-section";



export default function () {
  return (
    <>
      <Header />

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="border w-full rounded-lg flex flex-col gap-8 items-center justify-center h-96">
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl font-semibold max-w-xl text-center">
              Множество сайтов, ресурсов собранны в одном месте.
            </h3>
            <p className="text-lg text-muted-foreground text-center">
              Сайты, ресуры. Еженедельные обновления.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="user@example.com" />
            <Button variant="default">Подписаться</Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <OgRecentSectionSkeleton />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <SpotlightedSiteSectionSkeleton />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <SiteRecentSectionSkeleton />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto p-6">
        <SpotlightedOgSectionSkeleton />
      </div>

      <footer className="w-full max-w-screen-2xl mx-auto">
        <div className="w-full grid md:grid-cols-3 grid-cols-2 *:p-6">
          <div className="w-full h-full">
            <div className="flex flex-col gap-3">
              <Logo size={28} type="full" />
              <span className="text-lg text-muted-foreground">
                Множество сайтов, ресурсов собранны в одном месте.
              </span>
            </div>
          </div>
          <div className="w-full h-full col-span-2">
            <div className="w-full lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-3 *:h-80">
              <div className="w-full h-full bg-secondary" />
              <div className="w-full h-full bg-secondary" />
              <div className="w-full h-full bg-secondary" />
              <div className="w-full h-full bg-secondary" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
