import { LinkSchema, LinkWithBlurSchema } from "@/schemas";
import { imageHandler } from "./image-handler";
import { imgBlur } from "./img-blur";



export async function makeLinkImage(link: LinkSchema, blur?: boolean): Promise<LinkWithBlurSchema> {
  const withBlur = blur === true;

  if (withBlur) {

    if (!link.screenshot) return {
      ...link,
      blurImageURL: null
    }

    const screenshot = link.screenshot;

    const imageURL = screenshot ? imageHandler(screenshot) : null;

    const blurImageURL = imageURL ? await imgBlur(imageURL) : null;

    return {
      ...link,
      screenshot: imageURL,
      blurImageURL,
    }
  }
  if (!link.screenshot) return {
    ...link,
    blurImageURL: null
  }

  const screenshot = link.screenshot;

  const imageURL = screenshot ? imageHandler(screenshot) : null;

  return {
    ...link,
    screenshot: imageURL,
    blurImageURL: null
  }
}

export async function makeLinksImages(links: LinkSchema[], blur?: boolean): Promise<LinkWithBlurSchema[]> {
  return await Promise.all(links.map(async link => {

    const withBlur = blur === true;

    if (withBlur) {

      if (!link.screenshot) return {
        ...link,
        blurImageURL: null
      }

      const screenshot = link.screenshot;

      const imageURL = screenshot ? imageHandler(screenshot) : null;

      const blurImageURL = imageURL ? await imgBlur(imageURL) : null;

      return {
        ...link,
        screenshot: imageURL,
        blurImageURL,
      }
    }
    if (!link.screenshot) return {
      ...link,
      blurImageURL: null
    }

    const screenshot = link.screenshot;

    const imageURL = screenshot ? imageHandler(screenshot) : null;

    return {
      ...link,
      screenshot: imageURL,
      blurImageURL: null
    }
  }))
}
