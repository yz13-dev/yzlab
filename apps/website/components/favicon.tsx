import { cn } from "@yzlab/ui/cn";
import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";



type Props = {
  className?: string
  url?: string | null
}
export default function ({ className = "", url }: Props) {
  if (!url) return <div className={cn("size-5 shrink-0 rounded-full bg-secondary", className)}>
    <AlertCircleIcon className="w-full h-full text-muted-foreground" />
  </div>;
  return (
    <div className={cn("size-5 shrink-0 rounded-full bg-secondary", className)}>
      <div className="w-full h-full relative">
        <Image src={url} className="shrink-0" fill alt="" />
      </div>
    </div>
  )
}
