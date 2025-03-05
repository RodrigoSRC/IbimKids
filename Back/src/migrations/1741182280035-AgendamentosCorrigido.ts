import { MigrationInterface, QueryRunner } from "typeorm";

export class AgendamentosCorrigido1741182280035 implements MigrationInterface {
    name = 'AgendamentosCorrigido1741182280035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP COLUMN "crianca_idade"`);
        await queryRunner.query(`DROP TYPE "public"."agendamentos_crianca_idade_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."agendamentos_crianca_idade_enum" AS ENUM('BERÇARIO', 'INFANTIL', 'JUVENIL')`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD "crianca_idade" "public"."agendamentos_crianca_idade_enum" NOT NULL`);
    }

}
