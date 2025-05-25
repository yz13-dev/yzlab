import { Logo } from "@/components/logo";
import { format, parseISO } from "date-fns";
import { ArrowRightIcon, ExternalLink, GlobeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getIndexRegisrty } from "rest-api/domains";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "ui/components/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";

export default async function page() {
  const { data } = await getIndexRegisrty();
  const domains = data ?? [];
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
        <div className="rounded-2xl bg-card border over">
          <Table>
            <TableHeader>
              <TableRow className="w-full *:w-1/4">
                <TableHead className="pl-4">Домен</TableHead>
                <TableHead className="md:table-cell hidden">Статус</TableHead>
                <TableHead className="md:table-cell hidden">
                  Последнее обновление
                </TableHead>
                <TableHead>Ссылок</TableHead>
                <TableHead>Сниппетов</TableHead>
                <TableHead className="w-9" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.map((domain) => {
                const domainName = domain.domain;
                const isIndexed = domain.last_crawled_at !== null;
                const lastUpdated = domain.last_crawled_at
                  ? parseISO(domain.last_crawled_at)
                  : null;
                const domainUrl = new URL(domainName);
                const links = domain.links ?? [];
                const snippets = domain.snippets ?? [];
                const linkCount = links.length;
                const snippetsCount = snippets.length;
                const favicon = domain.favicon ?? null;
                const domainId = domainUrl.host;
                return (
                  <TableRow
                    key={domainName}
                    className="[&>td]:first:pl-4 [&>td]:last:pr-4"
                  >
                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center gap-1.5">
                            {favicon ? (
                              <Image
                                src={favicon}
                                alt="Favicon"
                                width={20}
                                height={20}
                              />
                            ) : (
                              <div className="size-5 flex items-center justify-center">
                                <GlobeIcon size={20} />
                              </div>
                            )}
                            <Badge variant="secondary">
                              <Link
                                href={domain.domain}
                                target="_blank"
                                className="inline-flex group hover:underline items-center gap-1"
                              >
                                <span className="line-clamp-1 max-w-24">
                                  {domainId}
                                </span>
                                <ExternalLink size={12} className="shrink-0" />
                              </Link>
                            </Badge>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent
                          className="space-y-2 w-full max-w-md"
                          side="top"
                        >
                          {favicon ? (
                            <Image
                              src={favicon}
                              alt="Favicon"
                              width={20}
                              height={20}
                            />
                          ) : (
                            <div className="size-5 flex items-center justify-center">
                              <GlobeIcon size={20} />
                            </div>
                          )}
                          <div className="space-y-0">
                            <span className="text-base block font-medium line-clamp-2">
                              {domain.title}
                            </span>
                            <span className="text-sm block text-muted-foreground">
                              {domain.description}
                            </span>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell className="md:table-cell hidden">
                      <span className="text-sm">
                        {isIndexed ? "Индексирован" : "Не индексирован"}
                      </span>
                    </TableCell>
                    <TableCell className="md:table-cell hidden">
                      <span className="text-sm">
                        {lastUpdated
                          ? format(lastUpdated, "dd.MM.yyyy")
                          : "Не обновлено"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{linkCount}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{snippetsCount}</span>
                    </TableCell>
                    <TableCell>
                      <Button size="icon" variant="secondary" asChild>
                        <Link href={`/registry/${domainId}`}>
                          <ArrowRightIcon size={16} />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
