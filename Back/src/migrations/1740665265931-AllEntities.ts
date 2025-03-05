import { MigrationInterface, QueryRunner } from "typeorm";

export class AllEntities1740665265931 implements MigrationInterface {
    name = 'AllEntities1740665265931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "telefone" character varying(15) NOT NULL, "data_registrada" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crianca_nome" character varying NOT NULL, "crianca_idade" character varying NOT NULL, "responsavel_nome" character varying NOT NULL, "telefone" character varying(15) NOT NULL, "observacao" character varying, "data_registrada" date NOT NULL DEFAULT now(), "escalaId" uuid, CONSTRAINT "PK_3890b7448ebc7efdfd1d43bf0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "escalas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "faixa_etaria" character varying NOT NULL, "limite" character varying NOT NULL, "data_escala" date NOT NULL, "data_turno" "public"."escalas_data_turno_enum" NOT NULL, "data_registrada" date NOT NULL DEFAULT now(), CONSTRAINT "PK_091240cc968cafd7c4874aaeff4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "telefone" character varying(15) NOT NULL, "data_registrada" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_6156f319c9b14286e5fcabc0d36" UNIQUE ("nome"), CONSTRAINT "PK_13f01466be85817b29ed8abf74f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "escalas_professores_professores" ("escalasId" uuid NOT NULL, "professoresId" uuid NOT NULL, CONSTRAINT "PK_e59ab9690d136d62e121c4f3191" PRIMARY KEY ("escalasId", "professoresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a4258a9243d80ad8424a8fedb0" ON "escalas_professores_professores" ("escalasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_28ff580268e0ea8741ee2b981c" ON "escalas_professores_professores" ("professoresId") `);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_607c63fca0ea63778887dd82b61" FOREIGN KEY ("escalaId") REFERENCES "escalas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" ADD CONSTRAINT "FK_a4258a9243d80ad8424a8fedb08" FOREIGN KEY ("escalasId") REFERENCES "escalas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" ADD CONSTRAINT "FK_28ff580268e0ea8741ee2b981c5" FOREIGN KEY ("professoresId") REFERENCES "professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" DROP CONSTRAINT "FK_28ff580268e0ea8741ee2b981c5"`);
        await queryRunner.query(`ALTER TABLE "escalas_professores_professores" DROP CONSTRAINT "FK_a4258a9243d80ad8424a8fedb08"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_607c63fca0ea63778887dd82b61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28ff580268e0ea8741ee2b981c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4258a9243d80ad8424a8fedb0"`);
        await queryRunner.query(`DROP TABLE "escalas_professores_professores"`);
        await queryRunner.query(`DROP TABLE "professores"`);
        await queryRunner.query(`DROP TABLE "escalas"`);
        await queryRunner.query(`DROP TABLE "agendamentos"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
