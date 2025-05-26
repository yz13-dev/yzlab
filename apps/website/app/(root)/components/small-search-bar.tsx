"use client";
import { Logo } from "@/components/logo";
import { ArrowRight, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "ui/cn";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Skeleton } from "ui/components/skeleton";

export function SmallSearchBarSkeleton() {
  return <Skeleton className="max-w-lg w-full h-[46px]" />;
}

export default function ({ defaultValue = "" }: { defaultValue?: string }) {
  const [focused, setFocused] = useState<boolean>(false);
  const [text, setText] = useState<string>(defaultValue);
  const router = useRouter();
  const search = () => {
    const query = text.trim();
    if (query.length > 0) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <div className="flex overflow-hidden items-center h-fit relative p-1 rounded-full border bg-background max-w-lg w-full gap-2">
      <div className="py-2 px-3 rounded-full bg-secondary">
        <Link href="/">
          <Logo size={20} type="icon" />
        </Link>
      </div>
      <div
        className={cn(
          "absolute top-0 left-[64px] h-full",
          focused ? "w-[calc(100%-90px-64px)]" : "w-full",
        )}
      >
        <Input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Поможем найти код"
          className="!bg-transparent border-none transition-all px-4 w-full !text-lg h-full"
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
            className="absolute h-full right-0 top-0 flex items-center gap-2 p-1"
          >
            <button
              type="button"
              disabled={text.length <= 3}
              className="px-2 disabled:opacity-50 text-muted-foreground hover:text-foreground"
            >
              <XIcon size={24} />
            </button>
            <Button className="h-full aspect-square" disabled={!focused}>
              <ArrowRight className="size-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
