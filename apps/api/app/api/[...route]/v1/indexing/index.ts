import { OpenAPIHono } from "@hono/zod-openapi";
import { domain } from "./domain/endpoint";
import { link } from "./link/endpoint";
import { preview } from "./preview/endpoint";




export const indexing = new OpenAPIHono();

indexing.route("/domain", domain)

indexing.route("/link", link)

indexing.route("/preview", preview)
