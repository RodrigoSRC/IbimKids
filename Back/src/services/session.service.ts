import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients.entity";
import { AppError } from "../errors/AppError";
import { TLoginRequest } from "../interfaces/login.interfaces";
import { sign } from "jsonwebtoken";
import "dotenv/config"

export class SessionService {
    async create({email,password}: TLoginRequest){
        const clientRepository = AppDataSource.getRepository(Client)
        const findClient = await clientRepository.findOne({
            where: {
                email
            },
            relations: {
                Contacts: true
            }
        })

        if(!findClient){
            throw new AppError("Credenciais inválidas", 401)
        }

        const passwordMatch = await compare(password, findClient.password)

        if(!passwordMatch) {
            throw new AppError("Credenciais inválidas", 401)
        }

        const token = sign(
            {userName: findClient.name}, 
            process.env.SECRET_KEY!, 
            {expiresIn: "1h", subject: findClient.id})

        return {"token": token, "user": findClient}
    }
}