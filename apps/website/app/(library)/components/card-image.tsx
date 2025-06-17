import Image, { type ImageProps } from "next/image";
import { cn } from "ui/cn";


type Props = ImageProps
export default async function ({ className = "", src, alt, placeholder = "empty", blurDataURL, ...props }: Props) {

  // const imageURL = typeof src === "string" ? imageHandler(src) : null;

  // const isURLImage = imageURL?.startsWith("http");

  // const blurImageURL = imageURL ? await imgBlur(imageURL) : null;

  // if (!imageURL) return null;
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
