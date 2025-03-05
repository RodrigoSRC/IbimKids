import { z } from "zod"

export const schema = z.object({
    email: z.string().email("Deve ser um e-mail"),
    senha: z.string().min(1)
})

export type LoginData = z.infer<typeof schema>