import Image, { type ImageProps } from "next/image";
import { cn } from "ui/cn";


type Props = ImageProps
export default function ({ className = "", src, alt, placeholder = "empty", blurDataURL, ...props }: Props) {
  return (
    <Image
      loading="lazy"
      decoding="async"
      className={cn("", className)}
      src={src}
      alt={alt}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      {...props}
    />
  )
}
