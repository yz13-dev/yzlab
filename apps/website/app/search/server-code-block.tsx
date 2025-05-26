import { codeToHtml } from "shiki";
import { cn } from "ui/cn";

type Props = {
  children: string;
  className?: string;
  lang: string;
};

export default async function ServerCodeBlock({
  children,
  lang,
  className = "",
}: Props) {
  const out = await codeToHtml(children, {
    lang: lang,
    mergeWhitespaces: true,
    defaultColor: "light",
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
  });

  return (
    <div
      className={cn("overflow-x-auto", className)}
      dangerouslySetInnerHTML={{ __html: out }}
    />
  );
}
