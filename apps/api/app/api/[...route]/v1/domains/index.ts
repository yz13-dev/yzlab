import { OpenAPIHono } from "@hono/zod-openapi";
import { by_domain } from "./[domain]/endpoint";
import { domain } from "./endpoint";


export const domains = new OpenAPIHono()

domains.route("/", domain)

domains.route("/domain", by_domain)
