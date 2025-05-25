import { Logo } from "@/components/logo";
import Link from "next/link";
import { Skeleton } from "ui/components/skeleton";

export default function () {
  return (
    <>
      <main className="max-w-4xl w-full mx-auto mt-[10%] px-6 mb-12">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Logo size={24} type="full" />
          </Link>
          <span className="text-3xl font-medium text-muted-foreground">/</span>
          <div className="-space-y-1 *:block">
            <h1 className="text-lg font-medium">Регистр</h1>
            <p className="text-xs text-muted-foreground">
              Список индексированных доменов
            </p>
          </div>
        </div>
      </main>
      <div className="max-w-4xl w-full mx-auto px-6">
        <Skeleton className="rounded-2xl bg-card border h-96" />
      </div>
    </>
  );
}
