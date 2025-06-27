import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { checkEmail } from "./action";

const route = createRoute({
  path: "/",
  method: "post",
  description: "Email",
  request: {
    query: z.object({
      email: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Email",
      content: {
        "application/json": {
          schema: z.object({
            email: z.string().nullable(),
            valid: z.boolean(),
          }),
        }
      }
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: z.object({
            email: z.string().nullable(),
            valid: z.boolean(),
          }),
        }
      }
    },
  }
});

export const email = new OpenAPIHono()

email.openapi(route, async (c) => {

  const email = c.req.query("email")

  try {
    if (!email) throw new Error("email is required")
    return c.json(checkEmail(email), 200)
  } catch (error) {
    console.log("error", error)
    return c.json({ email: null, valid: false }, 400);
  }
})
