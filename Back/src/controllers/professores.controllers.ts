import { Request, Response } from "express";
import { TProfRequest, TProfUpdateRequest } from "../interfaces/professores.interfaces";
import { ProfService } from "../services/professores.service";


class ProfsController {
    constructor(private profServices: ProfService){}
    async create(req: Request, res: Response) {
        const {nome, telefone }: TProfRequest = req.body
        
        const newProf = await this.profServices.create({nome, telefone})

        return res.status(201).json(newProf)
    }

    async list(req: Request, res: Response) {
        const profId = req.params.id as string
        const profs = await this.profServices.list(profId)

        return res.json(profs)
    }

    async update(req: Request, res: Response) {
        const updatedValues: TProfUpdateRequest = req.body

        const profId = req.params.id

        const updateProf = await this.profServices.update(updatedValues, profId)

        return res.json(updateProf)
    }

    async remove(req: Request, res: Response) {
        const profId = req.params.id
        await this.profServices.remove(profId)

        res.status(204).send()
    }
}

export { ProfsController }