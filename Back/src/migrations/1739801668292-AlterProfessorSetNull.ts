import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProfessorSetNull1739801668292 implements MigrationInterface {
    name = 'AlterProfessorSetNull1739801668292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professores" DROP CONSTRAINT "FK_aa3a7aeb2318998a0d2fc0cedc7"`);
        await queryRunner.query(`ALTER TABLE "professores" ADD CONSTRAINT "FK_aa3a7aeb2318998a0d2fc0cedc7" FOREIGN KEY ("escalaId") REFERENCES "escalas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professores" DROP CONSTRAINT "FK_aa3a7aeb2318998a0d2fc0cedc7"`);
        await queryRunner.query(`ALTER TABLE "professores" ADD CONSTRAINT "FK_aa3a7aeb2318998a0d2fc0cedc7" FOREIGN KEY ("escalaId") REFERENCES "escalas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
