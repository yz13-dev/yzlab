import { OpenAPIHono } from "@hono/zod-openapi";
import { domain } from "./all/[domain]/endpoint";
import { increase } from "./count/increase/endpoint";
import { link } from "./endpoint";
import { ogs } from "./ogs/endpoint";
import { sites } from "./sites/endpoint";

export const links = new OpenAPIHono();

links.route("/", link)

links.route("/count", increase)

links.route("/all", domain)

links.route("/sites", sites);

links.route("/ogs", ogs)
