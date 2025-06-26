import { Tables } from "@yzlab/supabase/supabase/database";
import { z } from "zod";

type ApiKey = Tables<"api-keys">

export const apiKeySchema = z.object({
  id: z.string().optional(),
  permissions: z.string().min(1, "Permissions is required"),
  scopes: z.array(z.string()).optional(),
  expires_at: z.string().min(1, "Expires at is required"),
  created_at: z.string().optional(),
})

export const createApiKeySchema = apiKeySchema.omit({ 
  id: true, 
  created_at: true 
})

export const updateApiKeySchema = apiKeySchema.partial().omit({ 
  id: true, 
  created_at: true 
})

export type ApiKeySchema = z.infer<typeof apiKeySchema>
export type CreateApiKeySchema = z.infer<typeof createApiKeySchema>
export type UpdateApiKeySchema = z.infer<typeof updateApiKeySchema> 