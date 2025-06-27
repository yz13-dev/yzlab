import { linkWithBlurSchemaArray } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { createLinks } from "./actions";


const route = createRoute({
  operationId: "createLink",
  path: "/",
  method: "post",
  request: {
    query: z.object({
      links: z.string().optional(),
      domain: z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.record(linkWithBlurSchemaArray).openapi("sites"),
        },
      },
      description: 'Get all sites links',
    },
    500: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.record(linkWithBlurSchemaArray).openapi("sites"),
        },
      },
      description: 'Internal server error',
    },
  },
})

export const link = new OpenAPIHono();

link.openapi(route, async (c) => {
  const links = c.req.query("links");
  const domain = c.req.query("domain");

  const linksArray = links ? links.split(",") : []

  if (!domain) {
    console.log("Domain not provided")
    return c.json([], 200);
  }

  if (!linksArray.length) {
    console.log("No links provided")
    return c.json([], 200);
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
