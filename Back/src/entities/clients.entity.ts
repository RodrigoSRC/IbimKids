import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

@Entity('clients')
class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @Column({ length: 15, nullable: false })
    telefone: string;

    @CreateDateColumn({ type: "date" })
    data_registrada: string;

    // @OneToMany(() => Contact, contact => contact.client)
    // @JoinColumn()
    // Contacts: Contact[];


    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const hasRounds: number = getRounds(this.senha);
        if (!hasRounds) {
            this.senha = hashSync(this.senha, 10);
        }
    }
}

export { Client };
