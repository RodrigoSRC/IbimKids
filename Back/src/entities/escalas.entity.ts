import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, JoinTable, OneToMany } from "typeorm";
import { Professor } from "./professores.entity";
import { Agendamento } from "./agendamentos.entity";

export enum Turno {
    MANHA = 'MANHA',
    TARDE = 'TARDE',
    NOITE = 'NOITE',
}
export enum FaixaEtaria {
    BERÇARIO = 'BERÇARIO',
    INFANTIL = 'INFANTIL',
    JUVENIL = 'JUVENIL',
}

@Entity('escalas')
class Escala {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;
    
    @Column()
    descricao: string;

    // @Column()
    // faixa_etaria: string;
    @Column({ type: "enum", enum: FaixaEtaria })
    faixa_etaria: FaixaEtaria; 

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

    @OneToMany(() => Agendamento, agendamento => agendamento.escala)
    @JoinTable()
    agendamentos: Agendamento[];

}

export { Escala };

