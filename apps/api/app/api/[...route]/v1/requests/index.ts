import { OpenAPIHono } from "@hono/zod-openapi";
import { accept } from "./[id]/accept/endpoint";
import { reject } from "./[id]/reject/endpoint";
import { request } from "./endpoint";
import { link } from "./link/endpoint";



export const requests = new OpenAPIHono();

requests.route("/", request)

requests.route("/:id/accept", accept)

requests.route("/:id/reject", reject)

requests.route("/link", link)
