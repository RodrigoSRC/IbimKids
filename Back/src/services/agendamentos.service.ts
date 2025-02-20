import { AppDataSource } from "../data-source";
import { Agendamento } from "../entities/agendamentos.entity";
import { Escala } from "../entities/escalas.entity";
import { agendamentoSchemaResponse } from "../schemas/agendamentos.schemas";
import { TAgendamentoRequest, TAgendamentoResponse, TAgendamentoUpdateRequest } from "../interfaces/agendamentos.interfaces";

import { AppError } from "../errors/AppError";


export class AgendamentoService {
    
    async create(data: TAgendamentoRequest ): Promise<TAgendamentoResponse> {
        const { crianca_nome, escalaId } = data

        const escalaRepository = AppDataSource.getRepository(Escala)
        const agendaRepository = AppDataSource.getRepository(Agendamento)


        const findEscala = await escalaRepository.findOne({
            where: {
                id: escalaId
            }
        })

        if (!findEscala) {
            throw new AppError("Escala não encontrada", 404)
        }

        const findAgenda = await agendaRepository.findOne({
            where: {
                crianca_nome
            }
        })
    
        if (findAgenda) {
            throw new AppError("Criança já agendada ou com mesmo nome. Por favor colocar outro nome", 409)
        }
    
        const agenda = agendaRepository.create({
            ...data,
            escala: findEscala
        })
    
        await agendaRepository.save(agenda)
    
        return agendamentoSchemaResponse.parse(agenda)
    }

    async list() {
        const agendaRepository = AppDataSource.getRepository(Agendamento);
    
        const agendamentos = await agendaRepository.find(
            {
            relations: ["escala"],
        }
    );
    console.log(agendamentos)
    
        // return agendamentos.map((agendamento) => agendamentoSchemaResponse.parse(agendamento));
        return agendamentos
    }

    async find(agendaId: string) {
        const agendaRepository = AppDataSource.getRepository(Agendamento)
        const agenda = await agendaRepository.findOne({
            where: { id: agendaId },
            relations: ["escala"],
        })

        if (!agenda) {
            throw new AppError("Agendamento não encontrado", 404)
        }
    
        // return agendamentoSchemaResponse.parse(agenda)
        return agenda
    
    }


    async update(data: TAgendamentoUpdateRequest, agendaId: string): Promise<TAgendamentoResponse> {
        const agendaRepository = AppDataSource.getRepository(Agendamento)
        const oldAgenda = await agendaRepository.findOneBy({ id: agendaId })

        if (!oldAgenda) {
            throw new AppError("Agendamento não encontrado", 404)
        }

        const newAgendaData = agendaRepository.create({
            ...oldAgenda,
            ...data
        })

        await agendaRepository.save(newAgendaData)



        return agendamentoSchemaResponse.parse(newAgendaData)
    }


    async remove(agendaId: string): Promise<void> {
        const agendaRepository = AppDataSource.getRepository(Agendamento)
        const agenda = await agendaRepository.findOneBy({ id: agendaId })

        if (!agenda) {
            throw new AppError("Agendamento não encontrado", 404)
        }
        await agendaRepository.remove(agenda)
    }
}