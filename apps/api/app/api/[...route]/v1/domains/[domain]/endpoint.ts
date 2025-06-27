import { domainSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getDomainByDomain } from "../actions";



const route = createRoute({
  path: "/{domain}",
  method: "get",
  request: {
    params: z.object({
      domain: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Get domain by domain",
      content: {
        "application/json": {
          // @ts-expect-error
          schema: domainSchema
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
  }
})


export const by_domain = new OpenAPIHono()


by_domain.openapi(route, async (c) => {

  const domain = c.req.param("domain");

  try {

    const data = await getDomainByDomain(domain)

    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json(null, 500);
  }
})
