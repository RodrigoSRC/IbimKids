import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, JoinTable } from "typeorm";
import { Professor } from "./professores.entity";
import { Agendamento } from "./agendamentos.entity";

export enum Turno {
    MANHA = 'MANHA',
    TARDE = 'TARDE',
    NOITE = 'NOITE',
}

@Entity('escalas')
class Escala {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;
    
    @Column()
    descricao: string;

    @Column()
    faixa_etaria: string;

    @Column({ nullable: false })
    limite: string;

    @Column({ type: "date" })
    data_escala: string;

    @Column({ type: "enum", enum: Turno })
    data_turno: Turno; 

    @CreateDateColumn({ type: "date" })
    data_registrada: string;

    @ManyToMany(() => Professor, professor => professor.escalas)
    @JoinTable()
    professores: Professor[];

    @ManyToMany(() => Agendamento, agendamento => agendamento.escala)
    @JoinTable()
    agendamentos: Agendamento[];
}

export { Escala };

