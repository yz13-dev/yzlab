import { domainSchemaArray } from "@/schemas";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { getDomains } from "./actions";

const route = createRoute({
  path: "/",
  method: "get",
  operationId: "getDomains",
  responses: {
    200: {
      description: "Get domains",
      content: {
        "application/json": {
          // @ts-expect-error
          schema: domainSchemaArray
        }
      }
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          // @ts-expect-error
          schema: domainSchemaArray
        }
      }
    },
  }
})

export const domain = new OpenAPIHono();

domain.openapi(route, async (c) => {
  try {
    const data = await getDomains();

    return c.json(data ?? [], 200);
  } catch (error) {
    console.error(error);
    return c.json([], 500);
  }
})
