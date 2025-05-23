import { Hono } from "hono";
import packageJson from "@/package.json";
import { handle } from "hono/vercel";
import { crawl } from "./crawl/endpoint";

export const runtime = "nodejs";

const app = new Hono().basePath("/");

const isDev = process.env.NODE_ENV === "development";

app.route("crawl", crawl);

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
