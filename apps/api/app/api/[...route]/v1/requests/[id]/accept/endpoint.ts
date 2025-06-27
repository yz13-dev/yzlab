import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { HTTPResponseError } from "hono/types";
import { createFromRequest, deleteRequest, getRequest } from "../../actions";



const route = createRoute({
  operationId: "acceptRequest",
  path: "/",
  method: "post",
  request: {
    params: z.object({
      id: z.string(),
    }),
    query: z.object({
      id: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Success",
      content: {
        'application/json': {
          schema: z.null().openapi("request"),
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
    },
  },
});

export const accept = new OpenAPIHono();

accept.openapi(route, async (c) => {
  const id = c.req.query("id")

  if (!id) return c.json(null, 400);

  try {

    const intId = Number.parseInt(id)

    const request = await getRequest(intId);

    if (!request) throw new Error("Request not found");

    await createFromRequest(request);

    await deleteRequest(intId);

    return c.json(null, 200);
  } catch (error) {
    const err = error as HTTPResponseError;
    return c.json(null, 500);
  }
})
