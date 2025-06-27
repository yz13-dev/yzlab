import { indexRequestSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getRequestByLink } from "../actions";


const route = createRoute({
  operationId: "getRequestByLink",
  path: "/",
  method: "post",
  request: {
    query: z.object({
      url: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Success",
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.record(indexRequestSchema).nullable().openapi("request"),
        },
      },
    },
    400: {
      description: "Not found",
      content: {
        'application/json': {
          schema: z.null().openapi("request"),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        'application/json': {
          schema: z.null().openapi("request"),
        },
      },
    },
  },
});

export const link = new OpenAPIHono();

link.openapi(route, async (c) => {
  const url = c.req.query("url")

  if (!url) return c.json(null, 400);

  try {

    const link = await getRequestByLink(url)

    return c.json(link, 200)
  } catch (error) {
    return c.json(null, 500);
  }
})
