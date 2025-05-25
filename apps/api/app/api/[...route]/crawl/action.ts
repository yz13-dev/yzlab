import { checkFavicon } from "@/lib/check-favicon";
import { extractContent } from "@/lib/extract-content";
import { extractLinks } from "@/lib/extract-links";
import { fetchPageContent } from "@/lib/fetch/page";

type CrawlProps = {
  url: string;
  js?: boolean;
};
export async function crawl({ url, js = false }: CrawlProps) {
  try {
    const baseUrl = new URL(url);

    const pathname = baseUrl.pathname;

    const isRoot = pathname === "/";

    const html = await fetchPageContent(url, js);
    const doc = extractContent(html, url);

    const title = doc.title;
    const description = doc.description;
    const tags = isRoot ? doc.tags : [];
    const snippets = doc.snippets;

    const links = extractLinks(html);

    const favicon = checkFavicon(
      tags.find(
        (tag) =>
          tag.attributes.rel === "icon" ||
          tag.attributes.rel === "shortcut icon" ||
          tag.attributes.rel === "icon shortcut",
      )?.attributes?.href ?? null,
      baseUrl.origin,
    );

    const linksWithBaseUrl = links.map((link) =>
      new URL(link, baseUrl).toString(),
    );

    console.group("[CRAWLED]");
    console.log("URL:", baseUrl.origin);
    console.log("PATH:", baseUrl.pathname);
    console.log("LINKS:", links.length);
    console.log("SNIPPETS:", snippets.length);

    const crawledAt = new Date().toISOString();

    console.groupEnd();

    return {
      error: null,
      favicon: favicon ?? null,
      crawled_at: crawledAt,
      domain: baseUrl.host,
      pathname,
      title,
      description,
      tags,
      snippets,
      links: linksWithBaseUrl,
    };
  } catch (error) {
    const err = error as { message: string | undefined };
    const message = err?.message;
    return {
      error: message ?? "Unknown error",
    };
  }
}
