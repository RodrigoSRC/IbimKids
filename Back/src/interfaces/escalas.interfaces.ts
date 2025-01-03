import { z } from "zod"
import { escalaSchema, escalaSchemaRequest, escalaSchemaResponse, escalasSchemaResponse } from "../schemas/escalas.schemas"
import { DeepPartial } from "typeorm"

type TEscalaRequest = z.infer<typeof escalaSchemaRequest>
type TEscala = z.infer<typeof escalaSchema>
type TEscalaResponse = z.infer<typeof escalaSchemaResponse>
type TEscalasResponse = z.infer<typeof escalasSchemaResponse>
type TEscalaUpdateRequest = DeepPartial<TEscalaRequest>

export { TEscalaRequest, TEscala, TEscalaResponse, TEscalasResponse, TEscalaUpdateRequest }