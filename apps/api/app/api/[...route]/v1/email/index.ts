import { OpenAPIHono } from "@hono/zod-openapi";
import { email as emailRoute } from "./endpoint";
import { subscribe } from "./subscribe/endpoint";



export const email = new OpenAPIHono()

email.route("/check", emailRoute)

email.route("/subscribe", subscribe)

email.route("/unsubscribe", subscribe)
