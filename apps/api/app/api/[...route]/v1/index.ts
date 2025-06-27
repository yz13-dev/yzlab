import { OpenAPIHono } from "@hono/zod-openapi";
import { links } from "./links";


export const v1 = new OpenAPIHono().basePath("/v1");



v1.route("/links", links);
