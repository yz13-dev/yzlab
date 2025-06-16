import packageJson from "@/package.json";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "./auth/endpoint";
import { crawl } from "./crawl/endpoint";
import { domains } from "./domains/endpoint";
import { indexing } from "./indexing/endpoint";
import { links } from "./links/endpoint";
import { requests } from "./requests/endpoint";
import { search } from "./search/endpoint";
import { snippets } from "./snippets/endpoint";

export const runtime = "nodejs";

const app = new Hono().basePath("/");

app.route("crawl", crawl);
app.route("domains", domains);
app.route("indexing", indexing);
app.route("search", search);
app.route("snippets", snippets);
app.route("requests", requests);
app.route("auth", auth);
app.route("links", links);

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
