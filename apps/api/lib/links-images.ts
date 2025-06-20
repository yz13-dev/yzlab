import type { DomainLink } from "@yzlab/api/types/domains";
import { imageHandler } from "./image-handler";
import { imgBlur } from "./img-blur";


export type DomainLinkWithBlur = DomainLink & {
  blurImageURL: string | null
}

export async function makeLinkImage(link: DomainLink, blur?: boolean): Promise<DomainLinkWithBlur> {
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

export async function makeLinksImages(links: DomainLink[], blur?: boolean): Promise<DomainLinkWithBlur[]> {
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
