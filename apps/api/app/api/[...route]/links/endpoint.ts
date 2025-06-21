import { expire, redis } from "@/extensions/redis";
import { makeLinkImage, makeLinksImages } from "@/lib/links-images";
import type { DomainLinkWithBlur } from "@yzlab/api/types/domains";
import { Hono } from "hono/quick";
import { createLinks, getLinkByDomainAndPathname, getOgsByTag, getRecentOgs, getRecentSites, getRootLinks, getRootLinksWithOgs, getSitesByTag, increaseClicks, increaseClicksByDomainAndPath } from "./actions";



export const links = new Hono();

links.post("/count/increase", async (c) => {

  const id = c.req.query("id");

  const path = c.req.query("path");
  const domain = c.req.query("domain");

  if (!id && !path && !domain) return c.json(null, 200);

  if (id) return c.json(await increaseClicks(parseInt(id)), 200);

  if (domain && path) return c.json(await increaseClicksByDomainAndPath(domain, path), 200);

  return c.json(null, 200);
})

links.get("/all/:domain", async (c) => {

  const domain = c.req.param("domain");
  const pathname = c.req.query("pathname");

  const path = pathname ? pathname : "/";


  try {
    const link = await getLinkByDomainAndPathname(domain, path)

    if (!link) return c.json(null, 404);

    const withLink = await makeLinkImage(link, true)

    return c.json(withLink, 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 500);
  }
})

links.get("/sites", async (c) => {
  const blur = c.req.query("blur");

  const withBlur = blur === "true";
  const offset = c.req.query("offset");

  const start = performance.now()

  try {
    const offsetInt = offset ? parseInt(offset) : 0;
    const key = `sites:${offsetInt}`
    console.log(key)

    const cached = await redis.get<DomainLinkWithBlur[]>(key)

    if (cached) {

      const end = performance.now()
      console.log(`Time taken to generate sites: ${end - start}`)

      return c.json(cached, 200);
    }

    const links = await getRootLinks(offsetInt)

    const withLinks = await makeLinksImages(links, withBlur)

    if (withLinks.length > 0) {
      await redis.set(key, withLinks, { ex: expire.day })
    }

    const end = performance.now()
    console.log(`Time taken to generate sites: ${end - start}`)

    return c.json(withLinks, 200);
  } catch (error) {
    console.log(error)

    const end = performance.now()
    console.log(`Time taken to generate sites: ${end - start}`)

    return c.json([], 200);
  }
});

links.get("/ogs", async (c) => {
  const blur = c.req.query("blur");

  const withBlur = blur === "true";
  const offset = c.req.query("offset");

  const start = performance.now()

  try {
    const offsetInt = offset ? parseInt(offset) : 0;
    const key = `ogs:${offsetInt}`
    console.log(key)

    const cached = await redis.get<DomainLinkWithBlur[]>(key)

    if (cached) {

      const end = performance.now()
      console.log(`Time taken to generate ogs: ${end - start}`)

      return c.json(cached, 200);
    }

    const links = await getRootLinksWithOgs(offsetInt)

    const withLinks = await makeLinksImages(links, withBlur)

    if (withLinks.length > 0) {
      await redis.set(key, withLinks, { ex: expire.day })
    }

    const end = performance.now()
    console.log(`Time taken to generate ogs: ${end - start}`)

    return c.json(withLinks, 200);
  } catch (error) {
    console.log(error)

    const end = performance.now()
    console.log(`Time taken to generate ogs: ${end - start}`)

    return c.json([], 200);
  }
});

links.get("/sites/recent", async (c) => {

  const key = "sites:recent"
  try {

    const cached = await redis.get<DomainLinkWithBlur[]>(key)
    if (cached) {
      return c.json(cached, 200);
    }

    const links = await getRecentSites()

    const withLinks = await makeLinksImages(links, true)


    if (withLinks.length > 0) {
      await redis.set(key, withLinks, { ex: expire.day })
    }

    return c.json(withLinks, 200);
  } catch (error) {
    console.log(error)
    return c.json([], 200);
  }
})

links.get("/ogs/recent", async (c) => {

  const key = "ogs:recent"
  try {

    const cached = await redis.get<DomainLinkWithBlur[]>(key)
    if (cached) {
      return c.json(cached, 200);
    }

    const links = await getRecentOgs()

    const withLinks = await makeLinksImages(links, true)


    if (withLinks.length > 0) {
      await redis.set(key, withLinks, { ex: expire.day })
    }

    return c.json(withLinks, 200);
  } catch (error) {
    console.log(error)
    return c.json([], 200);
  }
})

links.get("/sites/tag/:tag", async (c) => {

  const tag = c.req.param("tag");

  console.log(tag)

  if (!tag) return c.json([], 200);

  const key = `sites:${tag}`
  try {

    const cached = await redis.get<DomainLinkWithBlur[]>(key)
    if (cached) {
      return c.json(cached, 200);
    }

    const links = await getSitesByTag(tag)

    const withLinks = await makeLinksImages(links, true)


    if (withLinks.length > 0) {
      await redis.set(key, withLinks, { ex: expire.day })
    }

    return c.json(withLinks, 200);
  } catch (error) {
    console.log(error)
    return c.json([], 200);
  }
})

links.get("/ogs/tag/:tag", async (c) => {

  const tag = c.req.param("tag");

  if (!tag) return c.json([], 200);

  const key = `ogs:${tag}`
  try {

    const cached = await redis.get<DomainLinkWithBlur[]>(key)
    if (cached) {
      return c.json(cached, 200);
    }

    const links = await getOgsByTag(tag)

    const withLinks = await makeLinksImages(links, true)


    if (withLinks.length > 0) {
      await redis.set(key, withLinks, { ex: expire.day })
    }

    return c.json(withLinks, 200);
  } catch (error) {
    console.log(error)
    return c.json([], 200);
  }
})

links.post("/", async (c) => {
  const links = c.req.query("links");
  const domain = c.req.query("domain");

  const linksArray = links ? links.split(",") : []

  if (!domain) {
    console.log("Domain not provided")
    return c.json(null, 200);
  }

  if (!linksArray.length) {
    console.log("No links provided")
    return c.json(null, 200);
  }

  const preparedLinks = linksArray.map((link) => {
    return {
      domain: link,
      pathname: link,
    }
  })

  const created = await createLinks(preparedLinks)

  return c.json(created, 200);
})
