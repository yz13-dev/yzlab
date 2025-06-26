import { Tables } from "@yzlab/supabase/supabase/database";
import { z } from "zod";

type Domain = Tables<"domains">

export const domainSchema = z.object({
  id: z.string().optional(),
  domain: z.string().min(1, "Domain is required"),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  favicon: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  last_crawled_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
})

export const createDomainSchema = domainSchema.omit({ 
  id: true, 
  created_at: true 
})

export const updateDomainSchema = domainSchema.partial().omit({ 
  id: true, 
  created_at: true 
})

export type DomainSchema = z.infer<typeof domainSchema>
export type CreateDomainSchema = z.infer<typeof createDomainSchema>
export type UpdateDomainSchema = z.infer<typeof updateDomainSchema> 