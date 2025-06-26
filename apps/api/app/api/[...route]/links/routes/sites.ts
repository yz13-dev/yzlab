import { domainLinkWithBlurSchema } from "@/schemas";
import { createRoute, z } from "@hono/zod-openapi";

export const route = createRoute({
  operationId: "getSites",
  path: "/sites",
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
          schema: z.array(domainLinkWithBlurSchema).openapi("sites"),
        },
      },
      description: 'Get all sites links',
    },
    500: {
      content: {
        'application/json': {
          schema: z.null(),
        },
      },
      description: 'Internal server error',
    },
  },
})
