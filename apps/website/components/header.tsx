import { SearchIcon, SendIcon } from "lucide-react";
import { cn } from "ui/cn";
import { Button } from "ui/components/button";
import { Logo } from "./logo";
import Nav from "./nav";
import Modal from "./request/modal";
import Search from "./search";


type Props = {
  className?: string
}
export default function ({ className = "" }: Props) {
  return (
    <header className="w-full h-16 flex items-center">
      <div className={cn(
        "max-w-screen-2xl w-full flex justify-between items-center mx-auto px-6",
        className
      )}>
        <div className="flex items-center lg:w-fit w-[calc(100%-56px)] md:gap-6 gap-3">
          <Logo size={28} className="shrink-0" />
          <Nav />
        </div>
        <div className="flex w-fit lg:justify-start justify-center items-center gap-2">
          <Modal>
            <Button variant="secondary" size="lg" className="font-medium text-base">
              <SendIcon />
              <span className="hidden lg:block">
                Запросить сайт
              </span>
            </Button>
          </Modal>
          <Search>
            <Button variant="secondary" size="lg" className="font-medium text-base">
              <SearchIcon />
              <span className="hidden lg:block">
                Поиск
              </span>
            </Button>
          </Search>
          {/* <div className="size-10 border rounded-full bg-secondary" /> */}
        </div>
      </div>
    </header>
  )
}
