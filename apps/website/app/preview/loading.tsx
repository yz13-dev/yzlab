import { Skeleton } from "@yzlab/ui/components/skeleton";



export default function () {
  return (
    <>
      <div className="w-full px-6 py-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Skeleton className="max-w-sm w-full h-9" />
          <Skeleton className="w-24 h-9" />
        </div>
      </div>
      <Skeleton className="w-full max-w-6xl mx-auto h-80" />
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-3 grid-cols-1 mt-6">
        <div className="w-full grid grid-cols-1 gap-4 col-span-1">
          <Skeleton className="w-full aspect-[600/320]" />
          <Skeleton className="w-full aspect-[600/400]" />
        </div>
      </div>
    </>
  )
}
