import { FormEvent } from "react"
import { z } from "zod"

export const agendamentoSchema = z.object({
    crianca_nome: z.string(),
    crianca_idade: z.string(),
    responsavel_nome: z.string(),
    telefone: z.string(),
    observacao: z.string(),
    // escalaId: z.string(),
    // .max(15, "Necessário no máximo 10 digitos").min(10, "Necessário no mínimo 10 digitos")
})

export type TAgendamentoSchema = z.infer<typeof agendamentoSchema>