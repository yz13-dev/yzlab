import { Tables } from "@yzlab/supabase/supabase/database";
import { z } from "zod";

type IndexRequest = Tables<"index-requests">

export const indexRequestSchema = z.object({
  id: z.number().optional(),
  url: z.string().url("URL must be valid").min(1, "URL is required"),
  type: z.string().min(1, "Type is required"),
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  email: z.string().email("Email must be valid").nullable().optional(),
  created_at: z.string().optional(),
})

export const indexRequestSchemaArray = z.array(indexRequestSchema)

export const createIndexRequestSchema = indexRequestSchema.omit({
  id: true,
  created_at: true
})

export const updateIndexRequestSchema = indexRequestSchema.partial().omit({
  id: true,
  created_at: true
})

export type IndexRequestSchema = z.infer<typeof indexRequestSchema>
export type CreateIndexRequestSchema = z.infer<typeof createIndexRequestSchema>
export type UpdateIndexRequestSchema = z.infer<typeof updateIndexRequestSchema>
export type IndexRequestSchemaArray = z.infer<typeof indexRequestSchemaArray>
