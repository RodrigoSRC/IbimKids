import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn } from "typeorm";
import { Escala } from "./escalas.entity";

@Entity('professores')
class Professor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    nome: string;

    @Column({ length: 15, nullable: false })
    telefone: string;

    @CreateDateColumn({ type: "date" })
    data_registrada: string;

    @ManyToMany(() => Escala, escala => escala.professores)
    escalas: Escala[];
}

export { Professor };
