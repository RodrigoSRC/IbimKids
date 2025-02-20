import { z } from "zod"

export const escalaSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    faixa_etaria: z.string(),
    limite: z.string(),
    data_escala: z.string(),
    data_turno: z.string(),
    professorIds: z.array(z.string())
})

export type TEscalaSchema = z.infer<typeof escalaSchema>
