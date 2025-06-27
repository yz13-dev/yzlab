import packageJson from "@/package.json";
import { OpenAPIHono } from '@hono/zod-openapi';
import { compress } from 'hono/compress';
import { handle } from "hono/vercel";
import { v1 } from "./v1";

export const runtime = "nodejs";

const app = new OpenAPIHono().basePath("/");

app.use(compress())

app.route("/", v1)

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: 'YZLAB API',
    version: '1.0.0',
    description: "It's YZLAB API",
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local Server' },
    // { url: 'https://api.yzlab.ru', description: 'Production Server' },
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
