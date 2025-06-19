import { showRequestSite, showSearch } from "@yzlab/flags";
import { Button } from "@yzlab/ui/components/button";
import { Skeleton } from "@yzlab/ui/components/skeleton";
import { SearchIcon, SendIcon } from "lucide-react";
import Modal from "../request/modal";
import Search from "../search";


export default async function () {

  const showRequestForm = await showRequestSite()
  const showSearchForm = await showSearch()

  return (
    <div className="flex w-fit lg:justify-start justify-center items-center gap-2">
      {
        showRequestForm &&
        <Modal>
          <Button variant="secondary" size="lg" className="font-medium text-base">
            <SendIcon />
            <span className="hidden lg:block">
              Запросить сайт
            </span>
          </Button>
        </Modal>
      }
      {
        showSearchForm &&
        <Search>
          <Button variant="secondary" size="lg" className="font-medium text-base">
            <SearchIcon />
            <span className="hidden lg:block">
              Поиск
            </span>
          </Button>
        </Search>
      }
    </div>
  )
}

export const ActionsSkeleton = () => {
  return (
    <div className="flex w-fit lg:justify-start justify-center items-center gap-2">
      <Skeleton className="h-10 lg:w-44 w-12" />
      <Skeleton className="h-10 lg:w-28 w-12" />
    </div>
  )
}
