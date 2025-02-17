import {z} from "zod"

const agendamentoSchema = z.object({
    id: z.string(),
    crianca_nome: z.string(),
    crianca_idade: z.string(),
    responsavel_nome: z.string(),
    telefone: z.string(),
    observacao: z.string(),
    data_registrada: z.string(),
    escalaId: z.string().optional()
})

const agendamentoSchemaRequest = agendamentoSchema.omit({
    id: true,
    data_registrada: true
})

const agendamentoSchemaResponse = agendamentoSchema.omit({
    
})

const agendamentosSchemaResponse = z.array(agendamentoSchemaResponse)

export{agendamentoSchema, agendamentoSchemaRequest, agendamentoSchemaResponse, agendamentosSchemaResponse}