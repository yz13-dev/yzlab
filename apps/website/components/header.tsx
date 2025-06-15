import { SearchIcon } from "lucide-react";
import { Button } from "ui/components/button";
import { Logo } from "./logo";
import Nav from "./nav";
import Search from "./search";


export default function () {
  return (
    <header className="w-full h-16 flex items-center">
      <div className="max-w-screen-2xl w-full flex justify-between items-center mx-auto px-6">
        <div className="flex items-center md:gap-6 gap-3">
          <Logo size={28} />
          <Nav />
        </div>
        <div className="flex items-center gap-2">
          <Search>
            <Button variant="secondary" size="lg" className="font-medium text-base">
              <SearchIcon />
              Поиск
            </Button>
          </Search>
          {/* <div className="size-10 border rounded-full bg-secondary" /> */}
        </div>
      </div>
    </header>
  )
}
