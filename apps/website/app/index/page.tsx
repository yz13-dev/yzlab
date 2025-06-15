import Header from "@/components/header";
import { ExternalLinkIcon } from "lucide-react";
import { Badge } from "ui/components/badge";
import { Input } from "ui/components/input";
import { Skeleton } from "ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "ui/components/table";

export default function () {
  return (
    <>
      <Header />
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="w-full aspect-video flex items-center justify-center flex-col gap-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-semibold text-center">
              Индекс
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              Проверьте, есть сайт который вы ищете или нет.
            </p>
            <Input placeholder="Поиск" />
          </div>
        </div>
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
            <TableRow>
              <TableCell>
                <Skeleton className="size-11" />
              </TableCell>
              <TableCell>
                <div className="h-fit flex flex-col">
                  <span className="text-base font-medium">Название</span>
                  <span className="text-muted-foreground">Описание для сайта</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">yz13.ru<ExternalLinkIcon /></Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="size-11" />
              </TableCell>
              <TableCell>
                <div className="h-fit flex flex-col">
                  <span className="text-base font-medium">Название</span>
                  <span className="text-muted-foreground">Описание для сайта</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">yz13.ru<ExternalLinkIcon /></Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="size-11" />
              </TableCell>
              <TableCell>
                <div className="h-fit flex flex-col">
                  <span className="text-base font-medium">Название</span>
                  <span className="text-muted-foreground">Описание для сайта</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">yz13.ru<ExternalLinkIcon /></Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="size-11" />
              </TableCell>
              <TableCell>
                <div className="h-fit flex flex-col">
                  <span className="text-base font-medium">Название</span>
                  <span className="text-muted-foreground">Описание для сайта</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">yz13.ru<ExternalLinkIcon /></Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="size-11" />
              </TableCell>
              <TableCell>
                <div className="h-fit flex flex-col">
                  <span className="text-base font-medium">Название</span>
                  <span className="text-muted-foreground">Описание для сайта</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">yz13.ru<ExternalLinkIcon /></Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}
