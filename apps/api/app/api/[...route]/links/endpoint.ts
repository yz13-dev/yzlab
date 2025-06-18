import { expire, redis } from "@/extensions/redis";
import { makeLinksImages } from "@/lib/links-images";
import { Hono } from "hono/quick";
import type { DomainLinkWithBlur } from "rest-api/types/domains";
import { createLinks, getRootLinks, getRootLinksWithOgs } from "./actions";



export const links = new Hono();

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
