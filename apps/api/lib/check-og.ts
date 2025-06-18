export function checkOg(url: string | null, baseUrl?: string) {
  if (!url) return null;
  const isRelative = url.startsWith("/");
  if (isRelative) {
    if (!baseUrl) return null;
    return new URL(url, baseUrl).toString();
  }
  const isDataUrl = url.startsWith("data:");
  if (isDataUrl) return null;
  const isAbsolute = url.startsWith("http");
  if (isAbsolute) return url;
  const isLocal = url.startsWith("local:");
  if (isLocal) return null;
  return null;
}
