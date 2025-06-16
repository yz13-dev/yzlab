import * as cheerio from "cheerio";
import { detectLang } from "./code-registry/registry";

export function extractContent(html: string, url: string) {

  const baseUrl = new URL(url);

  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  const paragraphs = $("p")
    .map((_, el) => $(el).text())
    .get();
  // const codes = $("pre code")
  //   .map((_, el) => $(el).text())
  //   .get();

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

  const favicon = tags.find(tag => tag.name === "link" && tag.attributes.rel === "icon")?.attributes?.href;

  const faviconURL = `https://${baseUrl.host}${favicon}`;

  const descriptionTag = tags.find(
    (tag) => tag.attributes.name === "description",
  );

  const description = descriptionTag?.attributes?.content;

  return {
    domain: baseUrl.host,
    title,
    description,
    content: paragraphs.join("\n\n"),
    tags: onlyMetaTags,
    links: [...new Set(links)],
    favicon: favicon ? faviconURL : undefined
  };
}

export function extractMetadata(html: string) {

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


  const onlyOgs = onlyMetaTags.filter((tag) => {
    const isOg = tag.attributes.property?.includes("og:");
    if (isOg) return true;
    return false;
  })


  const imageTag = tags.find(tag => tag.attributes.property === "og:image");

  const image = imageTag?.attributes?.content;

  const titleTag = tags.find(tag => tag.attributes.property === "og:title");
  const title = titleTag?.attributes?.content;

  const descriptionTag = tags.find(tag => tag.attributes.property === "og:description");
  const description = descriptionTag?.attributes?.content;

  return {
    title,
    description,
    image,
    tags: onlyOgs,
  };
}

export function extractSnippets(html: string) {

  const $ = cheerio.load(html);

  const codes = $("pre code")
    .map((_, el) => $(el).text())
    .get();

  const snippets = codes.map((code) => ({
    code,
    language: detectLang(code), // можно позже улучшить
  }));


  return {
    snippets,
  };
}
