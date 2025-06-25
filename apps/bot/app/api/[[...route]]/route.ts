import packageJson from "@/package.json";
import { bot } from "@/app/bot";
import { webhookCallback } from "grammy";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.post("/webhook", webhookCallback(bot, "hono"));

app.get("/version", (c) => {
  const version = packageJson.name;
  return c.json(version);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
