"use client";

import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { kbd } from "motion/react-m";
import { useState } from "react";
import { search } from "rest-api/search";
import { Snippet } from "rest-api/types/domains";
import { Button } from "ui/components/button";
import CodeCopyButton from "./code-copy-button";
import { CodeBlockLoader } from "./client-code-block";
import { highlight } from "../lib/highlight";
import { SnippetCard } from "./snippet-card";

export default function AutoGrid({
  children,
  text = "",
  defaultOffset = 0,
  empty = false,
}: {
  empty?: boolean;
  defaultOffset?: number;
  children?: React.ReactNode;
  text?: string;
}) {
  // const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState<number>(defaultOffset);
  const [isEnd, setIsEnd] = useState<boolean>(defaultOffset < 100);
  const [loading, setLoading] = useState<boolean>(false);
  const disabled = isEnd ?? loading;
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await search(text, offset);
      const data = response.data ?? [];
      setOffset(offset + data.length);
      setIsEnd(data.length === 0);
      setSnippets((prev) => [...prev, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {children}
      {snippets.map((snippet) => {
        const lang = snippet.language;
        return (
          <SnippetCard key={snippet.id} snippet={snippet}>
            <div className="w-full bg-card relative font-mono border rounded-lg text-sm p-4">
              <CodeBlockLoader
                render={highlight}
                lang={lang}
                code={snippet.code}
              />
            </div>
          </SnippetCard>
        );
      })}
      {!empty && (
        <Button
          variant="ghost"
          disabled={disabled}
          className="w-full"
          onClick={loadMore}
        >
          {loading && <Loader2Icon size={16} className="animate-spin" />}

          {isEnd
            ? "Вы просмотрели все результаты"
            : loading
              ? "Загрузка..."
              : "Показать больше"}
        </Button>
      )}
    </>
  );
}
