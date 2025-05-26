"use client";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "ui/cn";
import { Button } from "ui/components/button";

export default function CodeCopyButton({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={copyToClipboard}
      className={cn("text-foreground/60", className)}
    >
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
    </Button>
  );
}
