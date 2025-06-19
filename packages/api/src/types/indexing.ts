
export type Tags = {
  name: string;
  attributes: {
    [name: string]: string;
  };
}

export type Snippet = {
  code: string;
  language: string;
}

export type DefaultCrawlResult = {
  domain: string;
  title: string;
  description: string;
  content: string;
  tags: Tags[];
}

export type CrawlScreenshotResult = {
  error: string | null;
  screenshot: string | null;
}

export type CrawlVideoResult = {
  error: string | null;
  video: string | null;
}

export type CrawlSnippetsResult = DefaultCrawlResult & {
  snippets: Snippet[];
}
