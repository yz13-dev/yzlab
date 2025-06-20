"use client";

import { isURLValid } from "@/lib/url-check";
import { Button } from "@yzlab/ui/components/button";
import { Input } from "@yzlab/ui/components/input";
import { ArrowRightIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";


export default function ({ defaultValue }: { defaultValue?: string }) {
  const [_, setUrl] = useQueryState("url", { shallow: false });

  const [value, setValue] = useState<string>(defaultValue ?? "");

  const invalid = !value || !isURLValid(value);
  const disabled = !value || invalid;

  const handleUrl = () => setUrl(value)

  return (
    <div className="flex w-full flex-row gap-2 max-w-md">
      <Input
        aria-invalid={invalid}
        placeholder="https://example.com"
        className="shrink"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          const isEnter = e.key === "Enter"
          if (isEnter) {
            if (disabled) return;
            handleUrl();
          }
        }}
      />
      <Button onClick={handleUrl} disabled={disabled}>
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
