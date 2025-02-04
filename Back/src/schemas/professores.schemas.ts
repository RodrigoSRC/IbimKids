import {z} from "zod"

const profSchema = z.object({
    id: z.string(),
    nome: z.string(),
    telefone: z.string(),
    data_registrada: z.string()
})

const profSchemaRequest = profSchema.omit({
    id: true,
    data_registrada: true
})

const profSchemaResponse = profSchema.omit({
})

const profsSchemaResponse = z.array(profSchemaResponse)

export{profSchema, profSchemaRequest, profSchemaResponse, profsSchemaResponse}