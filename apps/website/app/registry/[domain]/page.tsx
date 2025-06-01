import ServerCodeBlock from "@/app/search/server-code-block";
import { SnippetCard } from "@/app/search/snippet-card";
import { format, parseISO } from "date-fns";
import { GlobeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndexRegisrtyItem } from "rest-api/domains";
import { Badge } from "ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";

type PageProps = {
  params: Promise<{
    domain: string;
  }>;
};
export default async function page({ params }: PageProps) {
  const { domain } = await params;
  const { data: index } = await getIndexRegisrtyItem(domain);

  if (!index) return notFound();

  const favicon = index.favicon ?? null;

  const domainAsUrl = new URL(`https://${domain}`);

  const links = index.links ?? [];
  const snippets = index.snippets ?? [];

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
              {favicon ? (
                <Image src={favicon} alt="Favicon" width={24} height={24} />
              ) : (
                <div className="size-6 flex items-center justify-center">
                  <GlobeIcon size={24} />
                </div>
              )}
              <Link
                href={domainAsUrl.toString()}
                className="text-2xl font-medium"
              >
                {domain}
              </Link>
            </div>
          </div>
          <div className="space-y-3 *:block *:max-w-xl">
            <span className="text-3xl font-medium">{index.title}</span>
            <span className="text-base text-muted-foreground">
              {index.description}
            </span>
          </div>
        </div>
      </main>
      <Tabs defaultValue="links" className="max-w-4xl w-full mx-auto px-6">
        <TabsList className="mb-6">
          <TabsTrigger value="links">Ссылки</TabsTrigger>
          <TabsTrigger value="snippets">Снипеты</TabsTrigger>
        </TabsList>
        <TabsContent value="links">
          <div className="rounded-2xl bg-card border">
            <Table>
              <TableHeader>
                <TableRow className="w-full *:w-1/4">
                  <TableHead className="pl-4">Путь</TableHead>
                  <TableHead className="md:table-cell hidden">Статус</TableHead>
                  <TableHead className="md:table-cell hidden">
                    Последнее обновление
                  </TableHead>
                  <TableHead className="w-9" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((domain) => {
                  const domainName = domain.domain;
                  const isIndexed = domain.last_crawled_at !== null;
                  const lastUpdated = domain.last_crawled_at
                    ? parseISO(domain.last_crawled_at)
                    : null;
                  const pathname = domain.pathname;
                  return (
                    <TableRow
                      key={domainName + pathname}
                      className="[&>td]:first:pl-4 [&>td]:last:pr-4"
                    >
                      <TableCell>
                        <Badge variant="secondary">{pathname}</Badge>
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="snippets" className="space-y-6">
          {snippets.map((snippet) => {
            const lang = snippet.language;
            const code = snippet.code;
            const isCropped = code.length >= 200;
            const croppedCode = isCropped
              ? `${code.slice(0, 200)}...`
              : code;
            return (
              <SnippetCard key={snippet.id} snippet={snippet}>
                <ServerCodeBlock
                  className="w-full bg-card relative font-mono border rounded-b-lg text-sm p-4"
                  lang={lang}
                >
                  {croppedCode}
                </ServerCodeBlock>
              </SnippetCard>
            );
          })}
        </TabsContent>
      </Tabs>
      <footer className="max-w-4xl w-full mx-auto px-6 py-12">
        <span className="text-sm text-muted-foreground">YZ13 2025</span>
      </footer>
    </>
  );
}
