import { makeLinkImage } from "@/lib/links-images";
import { linkWithBlurSchema } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { getLinkByDomainAndPathname } from "../../actions";


const route = createRoute({
  operationId: "getLinkByDomainAndPathname",
  path: "/{domain}",
  method: "get",
  request: {
    params: z.object({
      domain: z.string().openapi("domain"),
    }),
    query: z.object({
      pathname: z.string().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          // @ts-expect-error
          schema: linkWithBlurSchema,
        },
      },
      description: 'Get all sites links',
    },
    404: {
      content: {
        'application/json': {
          schema: z.null().openapi("domain"),
        },
      },
      description: 'Not found',
    },
    500: {
      content: {
        'application/json': {
          schema: z.null().openapi("domain"),
        },
      },
      description: 'Internal server error',
    },
  },
})

export const domain = new OpenAPIHono();

domain.openapi(route, async (c) => {

  const domain = c.req.param("domain");
  const pathname = c.req.query("pathname");

  const path = pathname ? pathname : "/";

  if (!domain) return c.json(null, 404);

  try {
    const link = await getLinkByDomainAndPathname(domain, path)

    if (!link) return c.json(null, 404);

    const withLink = await makeLinkImage(link, true)

    return c.json(withLink, 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 500);
  }
})
