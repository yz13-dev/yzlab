import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { HTTPResponseError } from "hono/types";
import { deleteRequest, getRequest } from "../../actions";



const route = createRoute({
  operationId: "rejectRequest",
  path: "/",
  method: "post",
  request: {
    params: z.object({
      id: z.string(),
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
      content: {
        'application/json': {
          schema: z.null().openapi("request"),
        },
      },
    },
  },
});

export const reject = new OpenAPIHono();

reject.openapi(route, async (c) => {
  const id = c.req.param("id")

  if (!id) return c.json(null, 400);

  try {

    const intId = Number.parseInt(id)

    const request = await getRequest(intId);

    if (!request) throw new Error("Request not found");

    await deleteRequest(intId);

    return c.json(null, 200);
  } catch (error) {
    const err = error as HTTPResponseError;
    return c.json(null, 500);
  }
})
