import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients.entity"
import { TClientRequest, TClientResponse, TClientUpdateRequest } from "../interfaces/client.interfaces";
import { clientSchemaResponse } from "../schemas/clients.schemas";
import { AppError } from "../errors/AppError";


export class ClientService {
    async create(data: TClientRequest): Promise<TClientResponse> {
        const { email, nome, senha, telefone } = data
        const clientRepository = AppDataSource.getRepository(Client)
        const findClient = await clientRepository.findOne({
            where: {
                email
            }
        })
    
        if (findClient) {
            throw new AppError("Usuário já existe", 409)
        }
    
        const hashedPassword = await hash(senha, 10)
    
        const client = clientRepository.create({
            nome,
            email,
            senha: hashedPassword,
            telefone
        })
    
        await clientRepository.save(client)
    
        return clientSchemaResponse.parse(client)
    }

    async list(clientId: string) {
        const clientRepository = AppDataSource.getRepository(Client)
        const client = await clientRepository.findOneBy({ id: clientId })

        if (!client) {
            throw new AppError("Usuário não encontrado", 404)
        }
    
        return clientSchemaResponse.parse(client)
    }

    async update(data: TClientUpdateRequest, clientId: string): Promise<TClientResponse> {
        const clientRepository = AppDataSource.getRepository(Client)
        const oldClient = await clientRepository.findOneBy({ id: clientId })

        if (!oldClient) {
            throw new AppError("Usuário não encontrado", 404)
        }

        const newClientData = clientRepository.create({
            ...oldClient,
            ...data
        })

        await clientRepository.save(newClientData)



        return clientSchemaResponse.parse(newClientData)
    }


    async remove(clientId: string): Promise<void> {
        const clientRepository = AppDataSource.getRepository(Client)
        const client = await clientRepository.findOneBy({ id: clientId })

        if (!client) {
            throw new AppError("Usuário não encontrado", 404)
        }
        await clientRepository.remove(client)
    }
}