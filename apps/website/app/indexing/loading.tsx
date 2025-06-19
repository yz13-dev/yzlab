import Header from "@/components/header/header";
import { Skeleton } from "@yzlab/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yzlab/ui/components/table";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const RowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="rounded-lg size-11" />
      </TableCell>
      <TableCell className="max-w-sm w-full">
        <div className="h-fit w-full">
          <Skeleton className="w-1/3 h-6" />
          <div className="h-5 w-full shrink-0 flex items-center">
            <Skeleton className="w-40 h-3" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="w-40 h-[22px]" />
      </TableCell>
    </TableRow>
  )
}

export default function () {

  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      <Header />
      <div className="w-full max-w-4xl mx-auto p-6 min-h-dvh">
        <div className="w-full aspect-video flex items-center justify-center flex-col gap-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-semibold text-center">
              Индекс
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              Проверьте, есть сайт который вы ищете или нет.
            </p>
          </div>
        </div>
        <div className="mb-24">
          <div className="bg-card border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">
                    Иконка
                  </TableHead>
                  <TableHead>
                    Название
                  </TableHead>
                  <TableHead>
                    Домен
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  rows.map(row => {
                    return <RowSkeleton key={row} />
                  })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <footer className="w-full max-w-screen-2xl mx-auto p-6">
        <div className="flex items-center gap-2 *:w-1/3 justify-between w-full">
          <span className="text-sm text-start text-muted-foreground">Build with Love by YZ13</span>
          <span className="text-sm text-center text-muted-foreground">©2025 YZ13</span>
          <Link
            href="https://yz13.ru"
            className="text-sm text-muted-foreground justify-end inline-flex items-center gap-1"
          >
            YZ13
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </footer>
    </>
  )
}
