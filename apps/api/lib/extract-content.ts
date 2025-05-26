import * as cheerio from "cheerio";
import { detectLang } from "./code-registry/registry";

export function extractContent(html: string, url: string) {
  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  const paragraphs = $("p")
    .map((_, el) => $(el).text())
    .get();
  const codes = $("pre code")
    .map((_, el) => $(el).text())
    .get();

  const links = $("a")
    .map((_, el) => $(el).attr("href"))
    .get();

  const head = $("head");
  const tags = Object.values(head.children())
    .map((el) => {
      return {
        name: el.name,
        attributes: el.attribs,
      };
    })
    .filter((tag) => !!tag.name);

  const onlyMetaTags = tags.filter((tag) => {
    const isMeta = tag.name === "meta";
    if (isMeta) return true;
    const isLink = tag.name === "link";
    if (isLink) {
      const isIcon = (tag.attributes.rel ?? "").includes("icon");
      if (isIcon) return true;
      const isImageLink = tag.attributes.as === "image";
      if (isImageLink) return false;
      const isScript = tag.attributes.rel === "script";
      if (isScript) return false;
      const isStylesheet = tag.attributes.rel === "stylesheet";
      if (isStylesheet) return false;
      return false;
    }
    return false;
  });

  const descriptionTag = tags.find(
    (tag) => tag.attributes.name === "description",
  );

  const description = descriptionTag?.attributes?.content;

  return {
    url,
    title,
    description,
    content: paragraphs.join("\n\n"),
    snippets: codes.map((code) => ({
      code,
      language: detectLang(code), // можно позже улучшить
    })),
    tags: onlyMetaTags,
    links,
  };
}
