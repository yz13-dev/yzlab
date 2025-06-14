import { Logo } from "@/components/logo";
import { HeartIcon } from "lucide-react";
import { Button } from "ui/components/button";
import { Separator } from "ui/components/separator";

export default function () {
  return (
    <>
      <header className="w-full h-16 flex items-center">
        <div className="max-w-screen-2xl w-full flex justify-between items-center mx-auto px-6">
          <div className="flex items-center gap-6">
            <Logo size={28} />
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="lg" className="font-medium text-base">Сайты</Button>
              <Button variant="ghost" size="lg" className="font-medium text-base">OG</Button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-9 border rounded-full bg-secondary" />
          </div>
        </div>
      </header>
      <div className="w-full max-w-screen-2xl mx-auto px-6 py-3 bg-background">
        <div className="flex items-center gap-2 h-9">
          <Button variant="ghost"><HeartIcon /></Button>
          <Separator orientation="vertical" />
        </div>
      </div>
    </>
  )
}
