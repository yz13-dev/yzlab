import { Logo } from "@/components/logo";
import { ExternalLink, GlobeIcon } from "lucide-react";
import Link from "next/link";
import { getIndexRegisrty } from "rest-api/domains";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { Badge } from "ui/components/badge";

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
            <p className="text-sm text-muted-foreground">
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
                <TableHead className="pr-4">Сниппетов</TableHead>
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
                return (
                  <TableRow
                    key={domainName}
                    className="[&>td]:first:pl-4 [&>td]:last:pr-4"
                  >
                    <TableCell>
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
                            {domainUrl.host}
                            <ExternalLink size={12} />
                          </Link>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="md:table-cell hidden">
                      {isIndexed ? "Индексирован" : "Не индексирован"}
                    </TableCell>
                    <TableCell className="md:table-cell hidden">
                      {lastUpdated
                        ? format(lastUpdated, "dd.MM.yyyy")
                        : "Не обновлено"}
                    </TableCell>
                    <TableCell>{linkCount}</TableCell>
                    <TableCell>{snippetsCount}</TableCell>
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
