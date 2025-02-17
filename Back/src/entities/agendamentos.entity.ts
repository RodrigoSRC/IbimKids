import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Escala } from "./escalas.entity";


@Entity('agendamentos')
class Agendamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    crianca_nome: string;
    
    @Column()
    crianca_idade: string;

    @Column()
    responsavel_nome: string;

    @Column({ length: 15, nullable: false })
    telefone: string;

    @Column({ nullable: true })
    observacao: string;

    @CreateDateColumn({ type: "date" })
    data_registrada: string;

    @ManyToOne(() => Escala, { onDelete: 'SET NULL', nullable: true })
    escala: Escala | null;

}

export { Agendamento };