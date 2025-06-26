import { Tables } from "@yzlab/supabase/supabase/database";
import { z } from "zod";

type Snippet = Tables<"snippets">

export const snippetSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1, "Code is required"),
  language: z.string().min(1, "Language is required"),
  domain: z.string().nullable().optional(),
  pathname: z.string().nullable().optional(),
  created_at: z.string().optional(),
})

export const createSnippetSchema = snippetSchema.omit({ 
  id: true, 
  created_at: true 
})

export const updateSnippetSchema = snippetSchema.partial().omit({ 
  id: true, 
  created_at: true 
})

export type SnippetSchema = z.infer<typeof snippetSchema>
export type CreateSnippetSchema = z.infer<typeof createSnippetSchema>
export type UpdateSnippetSchema = z.infer<typeof updateSnippetSchema> 