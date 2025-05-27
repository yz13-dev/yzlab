import { Button } from "ui/components/button";
import { SmallSearchBarSkeleton } from "../(root)/components/small-search-bar";
import { SnippetCardSkeleton } from "./snippet-card";

export default function () {
  const codeSnippets = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <>
      <header className="w-full py-4 border-b gap-4 bg-background/60 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-screen-2xl w-full mx-auto px-6 flex items-center justify-start">
          <SmallSearchBarSkeleton />
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
            {codeSnippets.map((snippet) => {
              return <SnippetCardSkeleton key={snippet} />;
            })}
          </div>
        </div>
        <div className="w-2/4 lg:flex hidden flex-col"></div>
      </div>
    </>
  );
}
