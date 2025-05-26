"use client";
import { type JSX, useLayoutEffect, useState } from "react";
import { highlight } from "../lib/highlight";
import { LoaderIcon } from "lucide-react";

type Props = {
  initial?: JSX.Element;
};

export function ClientCodeBlock({ initial }: Props) {
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    void highlight('console.log("Rendered on client")', "ts").then(setNodes);
  }, []);

  return nodes ?? <p>Loading...</p>;
}

export function CodeBlockLoader({
  code,
  lang,
  render,
}: {
  code: string;
  lang: string;
  render: typeof highlight;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [nodes, setNodes] = useState<JSX.Element | null>(null);
  const tryRender = async () => {
    try {
      const result = await render(code, lang);
      setNodes(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    tryRender();
  }, [render]);

  if (loading)
    return (
      <div className="w-full aspect-video flex items-center justify-center">
        <LoaderIcon size={20} className="animate-spin" />
      </div>
    );
  return <ClientCodeBlock initial={nodes ?? undefined} />;
}
