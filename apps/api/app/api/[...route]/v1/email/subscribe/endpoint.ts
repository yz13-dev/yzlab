import { audienceId } from "@/const/audience";
import { resend } from "@/extensions/resend";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { checkEmail, sendWelcomeEmail } from "../action";


const route = createRoute({
  path: "/",
  method: "post",
  responses: {
    200: {
      description: "Subscribe",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
            object: z.string(),
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
    }
  }
})


export const subscribe = new OpenAPIHono()

subscribe.openapi(route, async (c) => {

  const email = c.req.query("email")

  if (!email) return c.json(null, 400);

  const checked = checkEmail(email)

  if (!checked.valid) return c.json(null, 400);
  if (!checked.email) return c.json(null, 400);

  try {
    const contacts = (await resend()).contacts;

    const contact = await contacts.create({
      email: checked.email,
      audienceId,
    })

    if (!contact.error) {
      await sendWelcomeEmail(checked.email)
    }

    return c.json(contact.data, 200);
  } catch (error) {
    console.log("error", error)
    return c.json(null, 500);
  }
})
