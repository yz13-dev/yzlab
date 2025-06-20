export const isURLValid = (url: string) =>
  url.match(/^https:\/\/[^/]+\.[^/]+(\/.+)?$/);
