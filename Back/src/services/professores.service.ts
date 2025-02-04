import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { Professor } from "../entities/professores.entity";
import { profSchemaResponse } from "../schemas/professores.schemas";
import { TProfRequest, TProfResponse, TProfUpdateRequest } from "../interfaces/professores.interfaces";

import { AppError } from "../errors/AppError";


export class ProfService {
    async create(data: TProfRequest): Promise<TProfResponse> {
        const { nome } = data
        const profRepository = AppDataSource.getRepository(Professor)
        const findProf = await profRepository.findOne({
            where: {
                nome
            }
        })
    
        if (findProf) {
            throw new AppError("Professor já existe", 409)
        }
    
        const prof = profRepository.create({
            ...data
        })
    
        await profRepository.save(prof)
    
        return profSchemaResponse.parse(prof)
    }

    // async list(profId: string) {
    //     const profRepository = AppDataSource.getRepository(Professor)
    //     const prof = await profRepository.findOneBy({ id: profId })

    //     if (!prof) {
    //         throw new AppError("Professor não encontrado", 404)
    //     }
    
    //     return profSchemaResponse.parse(prof)
    // }
    async list() {
        console.log("prof service")
        const profRepository = AppDataSource.getRepository(Professor);
    
        // Busca todas as escalas, incluindo os professores relacionados
        const profs = await profRepository.find(
        //     {
        //     relations: ["professores"], // Caso precise trazer os professores associados
        // }
    );

    console.log(profs)
    
        // Valida e transforma os dados antes de retornar
        // return profs.map((prof) => profSchemaResponse.parse(profs));
        return profs.map((prof) => profSchemaResponse.parse(prof));

    }

    async update(data: TProfUpdateRequest, profId: string): Promise<TProfResponse> {
        const profRepository = AppDataSource.getRepository(Professor)
        const oldProf = await profRepository.findOneBy({ id: profId })

        if (!oldProf) {
            throw new AppError("Professor não encontrado", 404)
        }

        const newProfData = profRepository.create({
            ...oldProf,
            ...data
        })

        await profRepository.save(newProfData)



        return profSchemaResponse.parse(newProfData)
    }


    async remove(profId: string): Promise<void> {
        const profRepository = AppDataSource.getRepository(Professor)
        const prof = await profRepository.findOneBy({ id: profId })

        if (!prof) {
            throw new AppError("Professor não encontrado", 404)
        }
        await profRepository.remove(prof)
    }
}