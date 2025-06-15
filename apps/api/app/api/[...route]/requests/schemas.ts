import { z } from "zod";


export const requestSchema = z.object({
  url: z.string(),
  type: z.enum(["site", "og"]),
  name: z.string().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
})
