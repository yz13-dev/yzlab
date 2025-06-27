import { Tables } from "@yzlab/supabase/supabase/database";
import { z } from "zod";

type Link = Tables<"links">

export const linkSchema = z.object({
  id: z.number().optional(),
  domain: z.string().min(1, "Domain is required"),
  pathname: z.string().min(1, "Pathname is required"),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  favicon: z.string().nullable().optional(),
  og: z.string().nullable().optional(),
  screenshot: z.string().nullable().optional(),
  clicks: z.number().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  last_crawled_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
})

export const createLinkSchema = linkSchema.omit({
  id: true,
  created_at: true
})

export const updateLinkSchema = linkSchema.partial().omit({
  id: true,
  created_at: true
})

// Schema for DomainLinkWithBlur (includes blurImageURL)
export const linkWithBlurSchema = linkSchema.extend({
  blurImageURL: z.string().nullable(),
})
export const linkWithBlurSchemaArray = z.array(linkWithBlurSchema)

export const linkWithBufferScreenshot = linkSchema.extend({
  screenshot: z.instanceof(Buffer).nullable(),
})

export type LinkSchema = z.infer<typeof linkSchema>
export type CreateLinkSchema = z.infer<typeof createLinkSchema>
export type UpdateLinkSchema = z.infer<typeof updateLinkSchema>
export type LinkWithBlurSchema = z.infer<typeof linkWithBlurSchema>
export type LinkWithBlurSchemaArray = z.infer<typeof linkWithBlurSchemaArray>
export type LinkWithBufferScreenshot = z.infer<typeof linkWithBufferScreenshot>
