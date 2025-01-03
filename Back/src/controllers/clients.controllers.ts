import { Request, Response } from "express";
import { TClientRequest, TClientUpdateRequest } from "../interfaces/client.interfaces";
import { ClientService } from "../services/clients.service";


class ClientsController {
    constructor(private clientService: ClientService) { }
    async create(req: Request, res: Response) {
        const { nome, email, senha, telefone }: TClientRequest = req.body
        const newClient = await this.clientService.create({ nome, email, senha, telefone })

        return res.status(201).json(newClient)
    }

    async list(req: Request, res: Response) {
        const clientId = req.params.id as string
        const clients = await this.clientService.list(clientId)
        return res.json(clients)
    }

    async update(req: Request, res: Response) {
        const updatedValues: TClientUpdateRequest = req.body
        const clientId = req.params.id

        const updateClient = await this.clientService.update(updatedValues, clientId)

        return res.json(updateClient)
    }

    async remove(req: Request, res: Response) {
        const clientId = req.params.id
        await this.clientService.remove(clientId)

        res.status(204).send()
    }
}

export { ClientsController }