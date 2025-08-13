import Header from "@/components/header/header";
import { getDomains } from "@yzlab/api";
import { Badge } from "@yzlab/ui/components/badge";
import { Input } from "@yzlab/ui/components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@yzlab/ui/components/table";
import { ArrowRightIcon, ConstructionIcon, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function () {

  const domains = await getDomains();
  console.log(domains)

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
            {
              false &&
              <Input placeholder="Поиск" />
            }
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
                  domains
                    .map(domain => {

                      const favicon = domain.favicon;
                      const title = domain.title;
                      const description = domain.description;

                      const domainName = domain.domain;

                      return (
                        <TableRow key={domain.id}>
                          <TableCell>
                            <div className="flex items-center border overflow-hidden rounded-lg justify-center size-11">
                              {
                                favicon
                                  ?
                                  <Image
                                    src={favicon}
                                    width={24}
                                    height={24}
                                    alt={domain.domain}
                                  />
                                  : <ConstructionIcon size={24} />
                              }
                            </div>
                          </TableCell>
                          <TableCell className="max-w-sm w-full">
                            <div className="h-fit w-full *:block">
                              <span className="line-clamp-1 text-base font-medium">{title}</span>
                              <span className="line-clamp-1 text-muted-foreground">
                                {description ?? "Нет описания"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" asChild>
                              <Link
                                href={`https://${domainName}`}
                                target="_blank"
                              >
                                {domainName}<ExternalLinkIcon />
                              </Link>
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <footer className="w-full max-w-4xl mx-auto p-6">
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
