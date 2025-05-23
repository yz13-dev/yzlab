import * as cheerio from "cheerio";

export function extractContent(html: string, url: string) {
  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  const paragraphs = $("p")
    .map((_, el) => $(el).text())
    .get();
  const codes = $("pre code")
    .map((_, el) => $(el).text())
    .get();

  return {
    url,
    title,
    content: paragraphs.join("\n\n"),
    snippets: codes.map((code) => ({
      code,
      language: detectLang(code), // можно позже улучшить
    })),
  };
}

function detectLang(code: string): string {
  if (code.includes("console.log") || code.includes("function"))
    return "javascript";
  if (code.includes("def ") || code.includes("print(")) return "python";
  return "plaintext";
}
