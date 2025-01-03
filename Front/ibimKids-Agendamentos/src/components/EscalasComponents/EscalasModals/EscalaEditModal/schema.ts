import { FormEvent } from "react"
import { z } from "zod"

export const escalaSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    faixa_etaria: z.string(),
    limite: z.string(),
    data_escala: z.string(),
    data_turno: z.string(),
    // .max(15, "Necessário no máximo 10 digitos").min(10, "Necessário no mínimo 10 digitos")
})

export type TEscalaSchema = z.infer<typeof escalaSchema>
