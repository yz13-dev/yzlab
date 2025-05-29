"use client";
import { Logo } from "@/components/logo";
import { useState } from "react";
import { Input } from "ui/components/input";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "ui/cn";
import { Button } from "ui/components/button";
import { ArrowRight, Loader2Icon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounceEffect } from "ahooks";

type Props = {
  disabled?: boolean;
  autoFocus?: boolean;
};
export default function ({ disabled = false, autoFocus = false }: Props) {
  const [focused, setFocused] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const presearch = (text: string) => {
    const query = text.trim();
    const path = `/search?q=${encodeURIComponent(query)}`;
    router.prefetch(path);
  };
  const search = () => {
    const query = text.trim();
    if (query.length > 0) {
      setLoading(true);
      try {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useDebounceEffect(
    () => {
      if (text && text.length >= 3) presearch(text);
    },
    [text],
    { wait: 250 },
  );
  return (
    <div className="flex overflow-hidden items-center h-16 relative px-2 rounded-full border bg-background max-w-lg w-full gap-2">
      <AnimatePresence>
        {!focused && (
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -25,
            }}
            transition={{
              duration: 0.25,
              type: "spring",
            }}
            className="py-2 px-3 rounded-full bg-secondary"
          >
            <Logo size={32} type="icon" />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn(
          "absolute top-0 left-0 h-full",
          focused ? "w-[calc(100%-90px)]" : "w-full",
        )}
      >
        <Input
          autoFocus={autoFocus}
          disabled={loading ?? disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Поможем найти код"
          className={cn(
            "!bg-transparent border-none transition-all px-4 w-full !text-xl h-full",
            focused ? "text-start" : "text-center",
          )}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />
      </div>
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 25,
            }}
            transition={{
              delay: 0.25,
              duration: 0.25,
            }}
            className="absolute h-full right-0 top-0 flex items-center gap-2 p-2"
          >
            <button
              type="button"
              disabled={text.length <= 3}
              className="px-2 disabled:opacity-50 text-muted-foreground hover:text-foreground"
            >
              <XIcon size={24} />
            </button>
            <Button
              disabled={loading || !focused || text.length <= 3 || disabled}
              className="h-full aspect-square"
              onClick={search}
            >
              {loading ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : (
                <ArrowRight className="size-5" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
