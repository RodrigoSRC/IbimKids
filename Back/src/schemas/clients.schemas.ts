import {z} from "zod"

const clientSchema = z.object({
    id: z.string(),
    nome: z.string(),
    email: z.string().email(),
    senha: z.string(),
    telefone: z.string(),
    data_registrada: z.string()
})

const clientSchemaRequest = clientSchema.omit({
    id: true,
    data_registrada: true
})

const clientSchemaResponse = clientSchema.omit({
    senha: true
})

const clientsSchemaResponse = z.array(clientSchemaResponse)

export{clientSchema, clientSchemaRequest, clientSchemaResponse, clientsSchemaResponse}