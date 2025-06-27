import { OpenAPIHono } from "@hono/zod-openapi";
import { domains } from "./domains";
import { email } from "./email";
import { indexing } from "./indexing";
import { links } from "./links";
import { requests } from "./requests";


export const v1 = new OpenAPIHono().basePath("/v1");

v1.route("/email", email)

v1.route("/indexing", indexing)

v1.route("/links", links);

v1.route("/requests", requests);

v1.route("/domains", domains);
