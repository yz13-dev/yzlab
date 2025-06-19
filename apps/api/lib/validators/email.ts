import { z } from "zod"

const schema = z.string().email()

export const isValidEmail = (email: string) => {
  return schema.safeParse(email).success
}
