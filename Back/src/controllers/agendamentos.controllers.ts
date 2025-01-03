import { Request, Response } from "express";
import { TAgendamentoUpdateRequest } from "../interfaces/agendamentos.interfaces";
import { AgendamentoService } from "../services/agendamentos.service";


class AgendamentoController {
    constructor(private agendaServices: AgendamentoService){}
    async create(req: Request, res: Response) {
        
        const newAgenda = await this.agendaServices.create(req.body)

        return res.status(201).json(newAgenda)
    }

    async list(req: Request, res: Response) {
        const agendaId = req.params.id as string
        const agendas = await this.agendaServices.list(agendaId)

        return res.json(agendas)
    }

    async update(req: Request, res: Response) {
        const updatedValues: TAgendamentoUpdateRequest = req.body

        const agendaId = req.params.id

        const updateAgenda = await this.agendaServices.update(updatedValues, agendaId)

        return res.json(updateAgenda)
    }

    async remove(req: Request, res: Response) {
        const agendaId = req.params.id
        await this.agendaServices.remove(agendaId)

        res.status(204).send()
    }
}

export { AgendamentoController }