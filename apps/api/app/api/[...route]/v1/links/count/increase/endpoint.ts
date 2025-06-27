import { linkSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { increaseClicks, increaseClicksByDomainAndPath } from "../../actions";



const route = createRoute({
  operationId: "increaseClicks",
  path: "/increase",
  method: "post",
  request: {
    query: z.object({
      id: z.string().optional(),
      path: z.string().optional(),
      domain: z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: z.record(linkSchema).nullable().openapi("increase"),
        },
      },
      description: 'Get all sites links',
    },
  },
})


export const increase = new OpenAPIHono();

increase.openapi(route, async (c) => {

  const id = c.req.query("id");

  const path = c.req.query("path");
  const domain = c.req.query("domain");

  if (!id && !path && !domain) return c.json(null, 200);

  if (id) return c.json(await increaseClicks(parseInt(id)), 200);

  if (domain && path) return c.json(await increaseClicksByDomainAndPath(domain, path), 200);

  return c.json(null, 200);
})
