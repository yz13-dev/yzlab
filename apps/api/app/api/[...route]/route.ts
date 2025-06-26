import packageJson from "@/package.json";
import { OpenAPIHono } from '@hono/zod-openapi';
import { compress } from 'hono/compress';
import { handle } from "hono/vercel";
import { auth } from "./auth/endpoint";
import { codes } from "./codes/endpoint";
import { crawl } from "./crawl/endpoint";
import { domains } from "./domains/endpoint";
import { email } from "./email/endpoint";
import { indexing } from "./indexing/endpoint";
import { links } from "./links/endpoint";
import { requests } from "./requests/endpoint";
import { search } from "./search/endpoint";
import { snippets } from "./snippets/endpoint";

export const runtime = "nodejs";

const app = new OpenAPIHono().basePath("/");

app.use(compress())

app.route("crawl", crawl);
app.route("domains", domains);
app.route("indexing", indexing);
app.route("search", search);
app.route("snippets", snippets);
app.route("requests", requests);
app.route("auth", auth);
app.route("auth/codes", codes);
app.route("links", links);
app.route("email", email);
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: 'YZLAB API',
    version: '1.0.0',
    description: "It's YZLAB API",
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local Server' },
    { url: 'https://api.yzlab.ru', description: 'Production Server' },
  ],
})

app.get("/version", (c) => {
  const version = packageJson.version;
  return c.json(version);
});

app.get("/health", (c) => c.json({ status: "ok" }));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
