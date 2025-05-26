import { search } from "rest-api/search";
import { Button } from "ui/components/button";
import SmallSearchBar from "../(root)/components/small-search-bar";
import AutoGrid from "./auto-grid";
import CodeBlock from "./server-code-block";
import { SnippetCard } from "./snippet-card";
import { Suspense } from "react";
import Loading from "./loading";

type PageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};
export default async function page({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;

  const { data } = await search(q);
  const snippets = data ?? [];

  return (
    <Suspense fallback={<Loading />}>
      <header className="w-full py-4 border-b gap-4 bg-background/60 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-screen-2xl w-full mx-auto px-6 flex items-center justify-start">
          <SmallSearchBar className="shrink" defaultValue={q} />
        </div>
      </header>
      <div className="max-w-screen-2xl divide-x border-x w-full mx-auto flex">
        <div className="lg:w-2/4 w-full divide-y">
          <div className="px-6 w-full py-3">
            <div className="flex items-center gap-2">
              <Button variant="secondary">Язык</Button>
            </div>
          </div>
          <div className="space-y-12 px-6 py-4">
            <AutoGrid defaultOffset={snippets.length} text={q}>
              {snippets.map((snippet) => {
                const lang = snippet.language;
                return (
                  <SnippetCard key={snippet.id} snippet={snippet}>
                    <CodeBlock
                      className="w-full bg-card relative font-mono border rounded-lg text-sm p-4"
                      lang={lang}
                    >
                      {snippet.code}
                    </CodeBlock>
                  </SnippetCard>
                );
              })}
            </AutoGrid>
          </div>
        </div>
        <div className="w-2/4 lg:flex hidden flex-col"></div>
      </div>
    </Suspense>
  );
}
