import { Request, Response } from "express";
import { SessionService } from "../services/session.service";


export class SessionController {
    constructor(private sessionService: SessionService) { }
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        const token = await this.sessionService.create({ email, password })

        return res.json(token)
    }
}