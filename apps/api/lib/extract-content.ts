import * as cheerio from "cheerio";
import { checkFavicon } from "./check-favicon";
import { detectLang } from "./code-registry/registry";
import { extractLinks } from "./extract-links";

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


  const titleTag = tags.find(tag => tag.attributes.property === "og:title");

  const imageTag = tags.find(tag => tag.attributes.property === "og:image");

  const image = imageTag?.attributes?.content;

  const title = titleTag?.attributes?.content;

  return {
    url,
    favicon,
    title,
    description,
    image,
    metatags: onlyMetaTags,
    tags: onlyOgs,
  };
}

export function extractSnippets(html: string, url: string) {

  const baseUrl = new URL(url);

  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  const paragraphs = $("p")
    .map((_, el) => $(el).text())
    .get();
  const codes = $("pre code")
    .map((_, el) => $(el).text())
    .get();

  // const links = $("a")
  //   .map((_, el) => $(el).attr("href"))
  //   .get();

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

  const extractedLinks = extractLinks(html);

  const favicon = checkFavicon(
    tags.find(
      (tag) =>
        tag.attributes.rel === "icon" ||
        tag.attributes.rel === "shortcut icon" ||
        tag.attributes.rel === "icon shortcut",
    )?.attributes?.href ?? null,
    baseUrl.origin,
  );

  const linksWithBaseUrl = extractedLinks.map((link) =>
    new URL(link, baseUrl).toString(),
  );

  return {
    url,
    title,
    description,
    content: paragraphs.join("\n\n"),
    snippets,
    favicon,
    tags: onlyMetaTags,
    links: linksWithBaseUrl,
  };
}
