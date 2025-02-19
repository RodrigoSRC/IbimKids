import { z } from "zod";

const escalaSchema = z.object({
    id: z.string(),
    nome: z.string(),
    descricao: z.string(),
    faixa_etaria: z.string(),
    limite: z.string(),
    data_escala: z.string(),
    data_turno: z.string(),
    data_registrada: z.string(),
    professorIds: z.array(z.string()).optional()
});

const escalaSchemaRequest = escalaSchema.omit({
    id: true,
    data_registrada: true,
});

const escalaSchemaResponse = escalaSchema.omit({
    
})

const escalasSchemaResponse = z.array(escalaSchemaResponse)

export{escalaSchema, escalaSchemaRequest, escalaSchemaResponse, escalasSchemaResponse}