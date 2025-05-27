import { ArrowRightIcon } from "lucide-react";
import type { Snippet } from "rest-api/types/domains";
import { Button } from "ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "ui/components/sheet";
import { highlight } from "../lib/highlight";
import { CodeBlockLoader } from "./client-code-block";
import CodeCopyButton from "./code-copy-button";
import ServerCodeBlock from "./server-code-block";

export default function CodePreviewButton({ snippet }: { snippet: Snippet }) {
  const isCropped = snippet.code.length >= 200;
  const lang = snippet.language;
  const code = snippet.code;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary" disabled={!isCropped}>
          <ArrowRightIcon size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:max-w-1/2 max-w-dvw space-y-4">
        <div className="p-4 w-full px-4 flex items-center justify-start">
          <div className="flex flex-col">
            <SheetTitle>{snippet.domain}</SheetTitle>
            <SheetDescription>{snippet.language}</SheetDescription>
          </div>
        </div>
        <div className="relative px-4 w-full">
          <CodeCopyButton
            code={snippet.code}
            className="absolute top-4 z-10 right-8"
          />
          <ServerCodeBlock
            className="w-full bg-card relative font-mono border rounded-lg text-sm p-4"
            lang={lang}
          >
            {code}
          </ServerCodeBlock>
        </div>
      </SheetContent>
    </Sheet>
  );
}
