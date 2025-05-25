import { Logo } from "@/components/logo";
import Link from "next/link";
import { Skeleton } from "ui/components/skeleton";

export default function () {
  return (
    <>
      <main className="max-w-4xl w-full mx-auto mt-[10%] px-6 mb-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Link href="/registry" className="text-2xl font-medium">
              <h1>Регистр</h1>
            </Link>
            <span className="text-2xl font-medium text-muted-foreground">
              /
            </span>
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>
          <div className="space-y-3 *:block *:max-w-xl">
            <Skeleton className="h-9 w-1/2" />
            <Skeleton className="h-8 w-1/3" />
          </div>
        </div>
      </main>
      <div className="max-w-4xl w-full mx-auto px-6 mb-6">
        <Skeleton className="h-9 w-1/4" />
      </div>
      <div className="max-w-4xl w-full mx-auto px-6">
        <Skeleton className="rounded-2xl bg-card border h-96" />
      </div>
      <footer className="max-w-4xl w-full mx-auto px-6 py-12">
        <span className="text-sm text-muted-foreground">YZ13 2025</span>
      </footer>
    </>
  );
}
