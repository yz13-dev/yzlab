import { audienceId, resend } from "@/extensions/resend";
import { Hono } from "hono";
import { checkEmail, sendWelcomeEmail } from "./action";


export const email = new Hono()

email.post("/", async (c) => {

  const email = await c.req.text()

  return c.json(checkEmail(email))
})


email.post("/subscribe", async (c) => {

  const email = await c.req.text()

  const checked = checkEmail(email)

  if (!checked.valid) return c.json(null);
  if (!checked.email) return c.json(null);

  try {
    const contacts = resend.contacts;

    const contact = await contacts.create({
      email: checked.email,
      audienceId,
    })

    if (!contact.error) {
      await sendWelcomeEmail(checked.email)
    }

    return c.json(contact);
  } catch (error) {
    console.log("error", error)
    return c.json(null);
  }
})

email.post("/unsubscribe", async (c) => {

  const email = await c.req.text()

  const checked = checkEmail(email)

  if (!checked.valid) return c.json(null);
  if (!checked.email) return c.json(null);

  try {
    const contacts = resend.contacts;

    const contact = await contacts.remove({
      email: checked.email,
      audienceId,
    })

    return c.json(contact);
  } catch (error) {
    console.log("error", error)
    return c.json(null);
  }
})
