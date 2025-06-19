import { Skeleton } from "@yzlab/ui/components/skeleton"


export const SectionSkeleton = ({ children = [], }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full py-4 space-y-4 *:px-4 h-fit border outline-8 outline-offset-0 outline-secondary/60 rounded-lg">
      <div>
        <Skeleton className="h-8 w-1/3" />
      </div>
      <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {children}
      </div>
    </div>
  )
}

export default function ({ children = [], title }: { title?: string, children?: React.ReactNode }) {
  return (
    <div className="w-full py-4 space-y-4 *:px-4 h-fit border outline-8 outline-offset-0 outline-secondary/60 rounded-lg">
      <div>
        <h3 className="text-2xl font-medium">{title ?? "Секция"}</h3>
      </div>
      <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {children}
      </div>
    </div>
  )
}
