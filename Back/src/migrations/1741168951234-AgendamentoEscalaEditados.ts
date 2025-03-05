import { MigrationInterface, QueryRunner } from "typeorm";

export class AgendamentoEscalaEditados1741168951234 implements MigrationInterface {
    name = 'AgendamentoEscalaEditados1741168951234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP COLUMN "crianca_idade"`);
        await queryRunner.query(`CREATE TYPE "public"."agendamentos_crianca_idade_enum" AS ENUM('BERÇARIO', 'INFANTIL', 'JUVENIL')`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD "crianca_idade" "public"."agendamentos_crianca_idade_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "escalas" DROP COLUMN "faixa_etaria"`);
        await queryRunner.query(`CREATE TYPE "public"."escalas_faixa_etaria_enum" AS ENUM('BERÇARIO', 'INFANTIL', 'JUVENIL')`);
        await queryRunner.query(`ALTER TABLE "escalas" ADD "faixa_etaria" "public"."escalas_faixa_etaria_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "escalas" DROP COLUMN "faixa_etaria"`);
        await queryRunner.query(`DROP TYPE "public"."escalas_faixa_etaria_enum"`);
        await queryRunner.query(`ALTER TABLE "escalas" ADD "faixa_etaria" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP COLUMN "crianca_idade"`);
        await queryRunner.query(`DROP TYPE "public"."agendamentos_crianca_idade_enum"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD "crianca_idade" character varying NOT NULL`);
    }

}
