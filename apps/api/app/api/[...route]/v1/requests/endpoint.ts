import { createIndexRequestSchema, indexRequestSchema, indexRequestSchemaArray } from "@/schemas";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { createClient } from "@yzlab/supabase/supabase/server";
import type { HTTPResponseError } from "hono/types";
import { cookies } from "next/headers";

const routeGET = createRoute({
  path: "/",
  method: "get",
  operationId: "getRequests",
  responses: {
    200: {
      description: "Success",
      content: {
        'application/json': {
          // @ts-expect-error
          schema: indexRequestSchemaArray,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        'application/json': {
          // @ts-expect-error
          schema: indexRequestSchemaArray,
        },
      },
    },
  },
})

const routePOST = createRoute({
  path: "/",
  method: "post",
  operationId: "createRequest",
  request: {
    body: {
      content: {
        "application/json": {
          // @ts-expect-error
          schema: createIndexRequestSchema,
        }
      },
      required: true,
      description: "Request body",
    }
  },
  responses: {
    200: {
      description: "Success",
      content: {
        'application/json': {
          // @ts-expect-error
          schema: indexRequestSchema,
        },
      },
    },
    400: {
      description: "Not found",
      content: {
        'application/json': {
          schema: z.null().openapi("request"),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        'application/json': {
          schema: z.null().openapi("request"),
        },
      },
    },
  },
});

export const request = new OpenAPIHono()

request.openapi(routeGET, async (c) => {
  try {
    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)
    const { data, error } = await supabase
      .from("index-requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      throw new Error(error.message)
    }

    return c.json(data)
  } catch (error) {
    const err = error as HTTPResponseError;

    console.log(err.message);

    try {

      const parsedErrorMessage = JSON.parse(err.message);

      console.log(parsedErrorMessage);

      return c.json([], 500);
    } catch (error) {

      return c.json([], 500);
    }
  }
});

request.openapi(routePOST, async (c) => {
  try {
    const contentType = c.req.header("Content-Type")

    if (contentType !== "application/json") throw new Error("Invalid content type")

    const body = await c.req.json();

    const isValid = createIndexRequestSchema.safeParse(body);

    if (!isValid.success) throw new Error(isValid.error.message);

    const cookieStore = await cookies()

    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from("index-requests")
      .insert(body)
      .select("*")
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return c.json(data)
  } catch (error) {
    const err = error as HTTPResponseError;

    console.log(err.message);

    try {

      const parsedErrorMessage = JSON.parse(err.message);

      console.log(parsedErrorMessage);

      return c.json(null, 500);
    } catch (error) {

      return c.json(null, 500);
    }
  }
})
