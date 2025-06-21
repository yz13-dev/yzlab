import { expire, redis } from "@/extensions/redis";
import { fetchPageContent } from "@/lib/fetch/page";
import { makeLinksImages } from "@/lib/links-images";
import { crawlDefault, crawlMetadata, crawlScreenshot } from "../crawl/action";
import { getRootLinks, getRootLinksWithOgs } from "../links/actions";



export const toBase64 = (png: string) => {
  const base64 = `data:image/png;base64,${png}`
  return base64;
}


export const reCacheLinks = async () => {
  const ogs = await getRootLinksWithOgs()

  const ogWithLinks = await makeLinksImages(ogs, true)

  const sites = await getRootLinks()

  const sitesWithLinks = await makeLinksImages(sites, false)

  if (ogWithLinks.length !== 0) {
    const key = "ogs:0"
    await redis.set(key, ogWithLinks, { ex: expire.day })
  }
  if (sitesWithLinks.length !== 0) {
    const key = "sites:0"
    await redis.set(key, sitesWithLinks, { ex: expire.day })
  }
}


export const getFullIndexing = async (url: string) => {
  const html = await fetchPageContent(url)

  const defaultCrawl = crawlDefault({ url, html })

  const screenshotCrawl = crawlScreenshot({ url })

  const metadataCrawl = crawlMetadata({ url, html })


  const [data, screenshot, metadata] = await Promise.all([defaultCrawl, screenshotCrawl, metadataCrawl])


  return {
    data,
    screenshot,
    metadata,
  }
}

export const getOgIndexing = async (url: string) => {
  const html = await fetchPageContent(url)

  const defaultCrawl = crawlDefault({ url, html })

  const metadataCrawl = crawlMetadata({ url, html })

  const [data, metadata] = await Promise.all([defaultCrawl, metadataCrawl])

  return {
    data,
    screenshot: null,
    metadata,
  }
}

export const getSiteIndexing = async (url: string) => {
  return await getFullIndexing(url)
}
