import { ArrowRightIcon } from "lucide-react";
import type { Snippet } from "rest-api/types/domains";
import { Button } from "ui/components/button";
import CodeCopyButton from "./code-copy-button";
import { Skeleton } from "ui/components/skeleton";

type Props = {
  snippet: Snippet;
  children: React.ReactNode;
};
export const SnippetCard = ({ snippet, children }: Props) => {
  return (
    <div className="space-y-4">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-semibold block">{snippet.domain}</span>
          <span className="text-sm text-muted-foreground">
            {snippet.language}
          </span>
        </div>
        <Button size="icon" variant="secondary">
          <ArrowRightIcon size={16} />
        </Button>
      </div>
      <div className="relative w-full">
        <CodeCopyButton
          code={snippet.code}
          className="absolute top-4 z-10 right-4"
        />
        {children}
      </div>
    </div>
  );
};

export const SnippetCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-semibold block">example.com</span>
          <span className="text-sm text-muted-foreground">language</span>
        </div>
        <Button size="icon" variant="secondary">
          <ArrowRightIcon size={16} />
        </Button>
      </div>
      <Skeleton className="aspect-video w-full" />
    </div>
  );
};
