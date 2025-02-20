import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToOneProfEscala1739985017947 implements MigrationInterface {
    name = 'ManyToOneProfEscala1739985017947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professores" DROP CONSTRAINT "FK_aa3a7aeb2318998a0d2fc0cedc7"`);
        await queryRunner.query(`CREATE TABLE "escalas_professores_professores" ("escalasId" uuid NOT NULL, "professoresId" uuid NOT NULL, CONSTRAINT "PK_e59ab9690d136d62e121c4f3191" PRIMARY KEY ("escalasId", "professoresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a4258a9243d80ad8424a8fedb0" ON "escalas_professores_professores" ("escalasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_28ff580268e0ea8741ee2b981c" ON "escalas_professores_professores" ("professoresId") `);
        await queryRunner.query(`CREATE TABLE "escalas_agendamentos_agendamentos" ("escalasId" uuid NOT NULL, "agendamentosId" uuid NOT NULL, CONSTRAINT "PK_ab683197617376c21e54aae0d1a" PRIMARY KEY ("escalasId", "agendamentosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_840e6f81e82b34f3dc387c0fe8" ON "escalas_agendamentos_agendamentos" ("escalasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8ebd9d3c91a769896da94d1a9" ON "escalas_agendamentos_agendamentos" ("agendamentosId") `);
        await queryRunner.query(`ALTER TABLE "professores" DROP COLUMN "escalaId"`);
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" ADD CONSTRAINT "FK_a4258a9243d80ad8424a8fedb08" FOREIGN KEY ("escalasId") REFERENCES "escalas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" ADD CONSTRAINT "FK_28ff580268e0ea8741ee2b981c5" FOREIGN KEY ("professoresId") REFERENCES "professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "escalas_agendamentos_agendamentos" ADD CONSTRAINT "FK_840e6f81e82b34f3dc387c0fe85" FOREIGN KEY ("escalasId") REFERENCES "escalas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "escalas_agendamentos_agendamentos" ADD CONSTRAINT "FK_c8ebd9d3c91a769896da94d1a98" FOREIGN KEY ("agendamentosId") REFERENCES "agendamentos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "escalas_agendamentos_agendamentos" DROP CONSTRAINT "FK_c8ebd9d3c91a769896da94d1a98"`);
        await queryRunner.query(`ALTER TABLE "escalas_agendamentos_agendamentos" DROP CONSTRAINT "FK_840e6f81e82b34f3dc387c0fe85"`);
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" DROP CONSTRAINT "FK_28ff580268e0ea8741ee2b981c5"`);
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" DROP CONSTRAINT "FK_a4258a9243d80ad8424a8fedb08"`);
        await queryRunner.query(`ALTER TABLE "professores" ADD "escalaId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8ebd9d3c91a769896da94d1a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_840e6f81e82b34f3dc387c0fe8"`);
        await queryRunner.query(`DROP TABLE "escalas_agendamentos_agendamentos"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28ff580268e0ea8741ee2b981c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4258a9243d80ad8424a8fedb0"`);
        await queryRunner.query(`DROP TABLE "escalas_professores_professores"`);
        await queryRunner.query(`ALTER TABLE "professores" ADD CONSTRAINT "FK_aa3a7aeb2318998a0d2fc0cedc7" FOREIGN KEY ("escalaId") REFERENCES "escalas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
