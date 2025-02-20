import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaEscalaNaoMaisUnico1739984157049 implements MigrationInterface {
    name = 'NomeDaEscalaNaoMaisUnico1739984157049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_607c63fca0ea63778887dd82b61"`);
        await queryRunner.query(`ALTER TABLE "escalas" DROP CONSTRAINT "UQ_2d6e64c668cd5551854ff9b1eb3"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_607c63fca0ea63778887dd82b61" FOREIGN KEY ("escalaId") REFERENCES "escalas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_607c63fca0ea63778887dd82b61"`);
        await queryRunner.query(`ALTER TABLE "escalas" ADD CONSTRAINT "UQ_2d6e64c668cd5551854ff9b1eb3" UNIQUE ("nome")`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_607c63fca0ea63778887dd82b61" FOREIGN KEY ("escalaId") REFERENCES "escalas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
