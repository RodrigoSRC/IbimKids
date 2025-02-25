import { z } from "zod"

export const agendamentoSchema = z.object({
    crianca_nome: z.string(),
    crianca_idade: z.string(),
    responsavel_nome: z.string(),
    telefone: z.string(),
    observacao: z.string(),
})

export type TAgendamentoSchema = z.infer<typeof agendamentoSchema>