import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
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

    @Column({ unique: true })
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

    @OneToMany(() => Professor, professor => professor.escala)
    @JoinColumn()
    professores: Professor[];

    @OneToMany(() => Agendamento, agendamento => agendamento.escala)
    @JoinColumn()
    agendamento: Agendamento[];
}

export { Escala };
