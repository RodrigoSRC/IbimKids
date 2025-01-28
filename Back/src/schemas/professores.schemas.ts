import {z} from "zod"

const profSchema = z.object({
    id: z.string(),
    nome: z.string(),
    telefone: z.string(),
    dataRegistrada: z.string()
})

const profSchemaRequest = profSchema.omit({
    id: true,
    dataRegistrada: true
})

const profSchemaResponse = profSchema.omit({
    // password: true
})

const profsSchemaResponse = z.array(profSchemaResponse)

export{profSchema, profSchemaRequest, profSchemaResponse, profsSchemaResponse}