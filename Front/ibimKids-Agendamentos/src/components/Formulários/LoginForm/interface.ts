import { z } from "zod"

export interface LoginFormValues {
    email: string;
    senha: string;
  }

export const loginSchema = z.object({
  email: z.string(),
  senha: z.string(),
})

export type TLoginSchema = z.infer<typeof loginSchema>