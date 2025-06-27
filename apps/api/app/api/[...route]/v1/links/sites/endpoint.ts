import { expire, redis } from "@/extensions/redis";
import { makeLinksImages } from "@/lib/links-images";
import { LinkWithBlurSchema, linkWithBlurSchemaArray } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getRootLinks } from "../actions";
import { recent } from "./recent/endpoint";
import { tag } from "./tag/[tag]/endpoint";

const route = createRoute({
  operationId: "getSites",
  path: "/",
  method: "get",
  request: {
    query: z.object({
      blur: z.string().optional(),
      offset: z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: linkWithBlurSchemaArray
        },
      },
      description: 'Get all sites links',
    },
    500: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: linkWithBlurSchemaArray
        },
      },
      description: 'Internal server error',
    },
  },
})

export const sites = new OpenAPIHono()

sites.route("/recent", recent)
sites.route("/tag", tag)

sites.openapi(route, async (c) => {
  const blur = c.req.query("blur");

  const withBlur = blur === "true";
  const offset = c.req.query("offset");

  const start = performance.now()

  try {
    const offsetInt = offset ? parseInt(offset) : 0;
    const key = `sites:${offsetInt}`
    console.log(key)

    const cached = await redis.get<LinkWithBlurSchema[]>(key)

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
})
