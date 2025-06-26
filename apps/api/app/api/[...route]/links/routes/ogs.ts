import { domainLinkWithBlurSchema } from "@/schemas";
import { createRoute, z } from "@hono/zod-openapi";

export const route = createRoute({
  operationId: "getOgs",
  path: "/ogs",
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
          schema: z.array(domainLinkWithBlurSchema).openapi("ogs"),
        },
      },
      description: 'Get all ogs links',
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
