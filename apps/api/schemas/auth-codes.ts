import { Tables } from "@yzlab/supabase/supabase/database";
import { z } from "zod";

type AuthCode = Tables<"auth-codes">

export const authCodeSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1, "Code is required"),
  expires_at: z.string().min(1, "Expires at is required"),
  created_at: z.string().optional(),
})

export const createAuthCodeSchema = authCodeSchema.omit({ 
  id: true, 
  created_at: true 
})

export const updateAuthCodeSchema = authCodeSchema.partial().omit({ 
  id: true, 
  created_at: true 
})

export type AuthCodeSchema = z.infer<typeof authCodeSchema>
export type CreateAuthCodeSchema = z.infer<typeof createAuthCodeSchema>
export type UpdateAuthCodeSchema = z.infer<typeof updateAuthCodeSchema> 