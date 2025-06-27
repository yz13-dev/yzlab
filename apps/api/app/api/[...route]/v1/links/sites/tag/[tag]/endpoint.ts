import { expire, redis } from "@/extensions/redis";
import { makeLinksImages } from "@/lib/links-images";
import { DomainLinkWithBlurSchema, domainLinkWithBlurSchemaArray } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getSitesByTag } from "../../../actions";



const route = createRoute({
  operationId: "getSitesByTag",
  path: "/{tag}",
  method: "get",
  request: {
    params: z.object({
      tag: z.string(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.record(domainLinkWithBlurSchemaArray).openapi("sites"),
        },
      },
      description: 'Get all sites links',
    },
    500: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.record(domainLinkWithBlurSchemaArray).openapi("sites"),
        },
      },
      description: 'Internal server error',
    },
  },
})

export const tag = new OpenAPIHono()

tag.openapi(route, async (c) => {

  const tag = c.req.param("tag");

  if (!tag) return c.json([], 200);

  const key = `sites:${tag}`
  try {

    const cached = await redis.get<DomainLinkWithBlurSchema[]>(key)
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
