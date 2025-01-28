import { Request, Response } from "express";
import { EscalaService } from "../services/escala.service";
import { TEscalaUpdateRequest } from "../interfaces/escalas.interfaces";


class EscalaController {
    constructor(private escalaServices: EscalaService) {}
    async create(req: Request, res: Response) {
        // const clientId = res.locals.clientId
        
        const newEscala = await this.escalaServices.create(req.body)

        return res.status(201).json(newEscala)
    }

    async list(req: Request, res: Response) {
        const escalaId = req.params.id as string
        const escalas = await this.escalaServices.list(escalaId)

        return res.json(escalas)
    }
    
    async listAll(req: Request, res: Response) {
        const escalas = await this.escalaServices.listAll();
    
        return res.status(200).json(escalas);
    }

    async update(req: Request, res: Response) {
        const updatedValues: TEscalaUpdateRequest = req.body

        const escalaId = req.params.id

        const updateEscala = await this.escalaServices.update(updatedValues, escalaId)

        return res.json(updateEscala)
    }

    async remove(req: Request, res: Response) {
        const escalaId = req.params.id
        await this.escalaServices.remove(escalaId)

        res.status(204).send()
    }
}

export { EscalaController }