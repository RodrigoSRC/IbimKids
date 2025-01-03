import { z } from "zod"
import { agendamentoSchema, agendamentoSchemaRequest, agendamentoSchemaResponse, agendamentosSchemaResponse } from "../schemas/agendamentos.schemas"
import { DeepPartial } from "typeorm"

type TAgendamentoRequest = z.infer<typeof agendamentoSchemaRequest>
type TAgendamento = z.infer<typeof agendamentoSchema>
type TAgendamentoResponse = z.infer<typeof agendamentoSchemaResponse>
type TAgendamentosResponse = z.infer<typeof agendamentosSchemaResponse>
type TAgendamentoUpdateRequest = DeepPartial<TAgendamentoRequest>

export { TAgendamentoRequest, TAgendamento, TAgendamentoResponse, TAgendamentosResponse, TAgendamentoUpdateRequest }