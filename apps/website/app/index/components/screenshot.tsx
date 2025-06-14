import Image from "next/image";
import { cn } from "ui/cn";

async function fetchScreenshot(url: string) {
  try {

    const api = new URL("crawl", "http://localhost:3000");
    const searchParams = api.searchParams;
    searchParams.set("url", url);
    searchParams.set("preset", "screenshot")

    const response = await fetch(api.toString(), {
      method: "POST",
    });
    const json = await response.json();

    const screenshot = json.screenshot;

    const asBase64 = `data:image/png;base64,${screenshot}`;

    return asBase64;
  } catch {
    return null;
  }
}

export default async function ({ url, className = "" }: { url: string, className?: string }) {

  const screenshot = await fetchScreenshot(url);


  return (
    <div className={cn("relative", className)}>
      {
        screenshot &&
        <Image
          src={screenshot}
          className="object-cover"
          fill
          alt=""
        />
      }
    </div>
  )
}
