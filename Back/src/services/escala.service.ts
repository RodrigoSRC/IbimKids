import { AppDataSource } from "../data-source";
import { Escala } from "../entities/escalas.entity";
import { escalaSchemaResponse } from "../schemas/escalas.schemas";
import { TEscalaRequest, TEscalaResponse, TEscalaUpdateRequest } from "../interfaces/escalas.interfaces";
import { Turno } from "../entities/escalas.entity";
import { Professor } from "../entities/professores.entity";
import { In } from "typeorm";

import { AppError } from "../errors/AppError";



export class EscalaService {
    
    async create(data: TEscalaRequest ): Promise<TEscalaResponse> {

        const {nome, data_escala, data_turno, professorIds} = data
        const escalaRepository = AppDataSource.getRepository(Escala)
        const professorRepository = AppDataSource.getRepository(Professor)

        const turnoEnum = data_turno as Turno;

        const hoje = new Date();
        const dataEscala = new Date(data_escala);
    
        if (dataEscala < hoje) {
            throw new AppError("Não é possível agendar uma data passada", 400);
        }

        // const findEscala = await escalaRepository.findOne({
        //     where: {
        //         nome
        //     }
        // })

        // if (findEscala) {
        //     throw new AppError(`Escala com nome ${nome} já existe`, 404)
        // }

        const findEscalaTurno = await escalaRepository.findOne({
            where: {
                data_escala,
                data_turno: turnoEnum
            },
        });
    
        if (findEscalaTurno) {
            throw new AppError("Já existe uma escala para este dia e turno", 400);
        }
        
        const professores = await professorRepository.findBy({
            id: In(professorIds ?? []),
        });
        
        

        const limite = professores.length * 15;

        const escala = escalaRepository.create({
            ...data,
            data_turno: turnoEnum,
            professores: professores,
            limite: limite.toString()
        });
    
        await escalaRepository.save(escala)
    
        return escalaSchemaResponse.parse(escala)
    }
    

    async list() {
        const escalaRepository = AppDataSource.getRepository(Escala);

        const escalas = await escalaRepository.find(
            {
            relations: ["professores"], 
        }
    );
    
        // return escalas.map((escala) => escalaSchemaResponse.parse(escala));
        return escalas
    }

    async find(escalaId: string) {
        const escalaRepository = AppDataSource.getRepository(Escala);
    
        const escala = await escalaRepository.findOne({
            where: { id: escalaId },
            relations: ["professores"],
        });

        return escala
    }
    


    async update(data: TEscalaUpdateRequest, escalaId: string): Promise<TEscalaResponse> {
        const {data_turno, professorIds} = data
        const escalaRepository = AppDataSource.getRepository(Escala);
        const professorRepository = AppDataSource.getRepository(Professor);
    
        const oldEscala = await escalaRepository.findOne({
            where: { id: escalaId },
            relations: ["professores"], // Carrega também os professores associados
        });
        const turnoEnum = data_turno as Turno;
    
        if (!oldEscala) {
            throw new AppError("Escala não encontrada", 404);
        }
    
        // Se professorIds forem passados, atualizamos a lista de professores
        let professores = oldEscala.professores; // Mantém os professores atuais
        if (professorIds) {
            // Busca os professores pelo array de IDs
            professores = await professorRepository.findBy({
                id: In(professorIds),
            });
    
            if (professores.length !== professorIds.length) {
                throw new AppError("Um ou mais professores não foram encontrados", 404);
            }
        }
    
        // Atualiza a escala com os novos dados e professores
        const newEscalaData = escalaRepository.create({
            ...oldEscala,
            ...data,
            data_turno: turnoEnum,
            professores, // Atualiza a lista de professores
        });
    
        await escalaRepository.save(newEscalaData);
    
        return escalaSchemaResponse.parse(newEscalaData);
    }


    async remove(escalaId: string): Promise<void> {
        const escalaRepository = AppDataSource.getRepository(Escala)
        const escala = await escalaRepository.findOneBy({ id: escalaId })

        if (!escala) {
            throw new AppError("Escala não encontrada", 404)
        }
        await escalaRepository.remove(escala)
    }
}