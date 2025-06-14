import * as cheerio from "cheerio";
import { checkFavicon } from "./check-favicon";
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

  const snippets = codes.map((code) => ({
    code,
    language: detectLang(code), // можно позже улучшить
  }));

  return {
    url,
    title,
    description,
    content: paragraphs.join("\n\n"),
    snippets,
    tags: onlyMetaTags,
    links,
  };
}

export function extractMetadata(html: string, url: string) {
  const $ = cheerio.load(html);

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

  const baseUrl = new URL(url);

  const favicon = checkFavicon(
    onlyMetaTags.find(
      (tag) =>
        tag.attributes.rel === "icon" ||
        tag.attributes.rel === "shortcut icon" ||
        tag.attributes.rel === "icon shortcut",
    )?.attributes?.href ?? null,
    baseUrl.origin,
  );

  const onlyOgs = onlyMetaTags.filter((tag) => {
    const isOg = tag.attributes.property?.includes("og:");
    if (isOg) return true;
    return false;
  })

  const descriptionTag = tags.find(
    (tag) => tag.attributes.name === "description",
  );

  const description = descriptionTag?.attributes?.content;


  return {
    url,
    favicon,
    description,
    metatags: onlyMetaTags,
    tags: onlyOgs,
  };
}
