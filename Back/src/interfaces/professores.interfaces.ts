import { z } from "zod"
import { profSchema, profSchemaRequest, profSchemaResponse, profsSchemaResponse } from "../schemas/professores.schemas"
import { DeepPartial } from "typeorm"

type TProfRequest = z.infer<typeof profSchemaRequest>
type TProf = z.infer<typeof profSchema>
type TProfResponse = z.infer<typeof profSchemaResponse>
type TProfsResponse = z.infer<typeof profsSchemaResponse>
type TProfUpdateRequest = DeepPartial<TProfRequest>

export { TProf, TProfRequest, TProfResponse, TProfsResponse, TProfUpdateRequest }