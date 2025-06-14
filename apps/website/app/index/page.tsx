import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Separator } from "ui/components/separator";
import { Skeleton } from "ui/components/skeleton";
import Details, { DetailsSkeleton } from "./components/details";
import Screenshot from "./components/screenshot";

type PageProps = {
  searchParams: Promise<{
    url: string;
  }>
}

const validateUrl = (url: string): boolean => {
  try {
    // Basic checks
    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      return false;
    }

    // Check if URL has protocol, add https if missing
    let processedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      processedUrl = `https://${url}`;
    }

    // Use the URL constructor for validation
    new URL(processedUrl);

    // Additional security checks
    const disallowedProtocols = ['javascript:', 'data:', 'file:', 'ftp:'];
    if (disallowedProtocols.some(proto => processedUrl.startsWith(proto))) {
      return false;
    }

    // Domain validation (optional)
    const domain = new URL(processedUrl).hostname;
    if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(domain)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export default async function ({ searchParams }: PageProps) {
  const { url } = await searchParams;

  if (!url) return notFound();

  const isValidUrl = validateUrl(url);

  if (!isValidUrl) return notFound();

  const domain = new URL(url);

  const host = domain.host;

  return (
    <>
      <div className="max-w-6xl p-6 w-full mx-auto">
        <span className="text-2xl font-medium">{url}</span>
      </div>
      <Separator />
      <div className="max-w-6xl space-y-3 p-6 w-full mx-auto">
        <h1 className="font-medium text-lg block">Индексирование</h1>
        <div className="w-full gap-4 bg-card rounded-xl border p-4 flex">
          <Suspense fallback={
            <Skeleton className="max-w-[40%] w-full aspect-[640/400]" />
          }>
            <Screenshot
              url={url}
              className="max-w-[40%] w-full aspect-[640/400] border rounded-lg overflow-hidden"
            />
          </Suspense>
          <Suspense fallback={
            <DetailsSkeleton />
          }>
            <Details host={host} url={url} />
          </Suspense>
        </div>
      </div>
      <div className="max-w-6xl p-6 w-full mx-auto">
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="aspect-[640/400] w-full border rounded-xl bg-card" />
          <div className="aspect-[640/400] w-full border rounded-xl bg-card" />
          <div className="aspect-[640/400] w-full border rounded-xl bg-card" />
        </div>
      </div>
    </>
  )
}
