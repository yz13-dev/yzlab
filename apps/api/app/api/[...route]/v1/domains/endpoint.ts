import { domainSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getDomains } from "./actions";

const route = createRoute({
  path: "/",
  method: "get",
  responses: {
    200: {
      description: "Get domains",
      content: {
        "application/json": {
          // @ts-expect-error
          schema: z.array(z.record(domainSchema))
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          // @ts-expect-error
          schema: z.array(z.record(domainSchema))
        }
      }
    },
  }
})

export const domain = new OpenAPIHono();

domain.openapi(route, async (c) => {
  try {
    const data = await getDomains();

    return c.json(data ?? [], 200);
  } catch (error) {
    console.error(error);
    return c.json([], 500);
  }
})
