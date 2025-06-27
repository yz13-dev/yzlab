import { expire, redis } from "@/extensions/redis";
import { makeLinksImages } from "@/lib/links-images";
import { LinkWithBlurSchema, linkWithBlurSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getRecentOgs } from "../../actions";



const route = createRoute({
  operationId: "getRecentOgs",
  path: "/",
  method: "get",
  request: {},
  responses: {
    200: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.array(linkWithBlurSchema).openapi("ogs"),
        },
      },
      description: 'Get all ogs links',
    },
    500: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.array(linkWithBlurSchema).openapi("ogs"),
        },
      },
      description: 'Internal server error',
    },
  },
})

export const recent = new OpenAPIHono()


recent.openapi(route, async (c) => {
  const key = "ogs:recent"
  try {

    const cached = await redis.get<LinkWithBlurSchema[]>(key)
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
