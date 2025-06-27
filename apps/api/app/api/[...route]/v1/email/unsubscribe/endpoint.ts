import { audienceId } from "@/const/audience";
import { resend } from "@/extensions/resend";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { checkEmail } from "../action";


const route = createRoute({
  method: "post",
  path: "/",
  responses: {
    200: {
      description: "Unsubscribe",
      content: {
        "application/json": {
          schema: z.object({
            object: z.string(),
            deleted: z.boolean(),
            contact: z.string()
          }).nullable()
        }
      }
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: z.null()
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

export const unsubscribe = new OpenAPIHono()


unsubscribe.openapi(route, async (c) => {

  const email = c.req.query("email")

  if (!email) return c.json(null, 400);

  const checked = checkEmail(email)

  if (!checked.valid) return c.json(null, 400);
  if (!checked.email) return c.json(null, 400);

  try {
    const contacts = (await resend()).contacts;

    const contact = await contacts.remove({
      email: checked.email,
      audienceId,
    })

    return c.json(contact.data, 200);
  } catch (error) {
    console.log("error", error)
    return c.json(null, 500);
  }
})
