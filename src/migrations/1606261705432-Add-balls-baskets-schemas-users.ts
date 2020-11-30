import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddBallsBasketsSchemasUsers1606261705432 implements MigrationInterface {
  name = 'AddBallsBasketsSchemasUsers1606261705432'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "schema" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "detail" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_4560fb648e43aaca39514a74f5c" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TYPE "schema_to_basket_priority_enum" AS ENUM('1', '2', '3', '4', '5')`)
    await queryRunner.query(`CREATE TABLE "schema_to_basket" ("basketId" integer NOT NULL, "schemaId" integer NOT NULL, "priority" "schema_to_basket_priority_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_9716d5ebddebdf0c2479142b69c" PRIMARY KEY ("basketId", "schemaId", "priority"))`)
    await queryRunner.query(`CREATE TABLE "basket" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('super_admin', 'admin', 'quality_engineer')`)
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(50), "login" character varying(50), "passwordHash" character varying, "role" "user_role_enum" NOT NULL DEFAULT 'quality_engineer', "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "ball" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "detail" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "basketId" integer, "userId" integer, CONSTRAINT "PK_385823f2e48ec0f387f83037514" PRIMARY KEY ("id"))`)
    await queryRunner.query(`ALTER TABLE "schema_to_basket" ADD CONSTRAINT "FK_be9c2c9920f973ae6d9aae41352" FOREIGN KEY ("schemaId") REFERENCES "schema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "schema_to_basket" ADD CONSTRAINT "FK_674708feb8e83d2ceefd8b1e055" FOREIGN KEY ("basketId") REFERENCES "basket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "ball" ADD CONSTRAINT "FK_ffd3f3dc95181a2c0b6f644ac29" FOREIGN KEY ("basketId") REFERENCES "basket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "ball" ADD CONSTRAINT "FK_cc9f92bfbe086a0da1a2cca24bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ball" DROP CONSTRAINT "FK_cc9f92bfbe086a0da1a2cca24bb"`)
    await queryRunner.query(`ALTER TABLE "ball" DROP CONSTRAINT "FK_ffd3f3dc95181a2c0b6f644ac29"`)
    await queryRunner.query(`ALTER TABLE "schema_to_basket" DROP CONSTRAINT "FK_674708feb8e83d2ceefd8b1e055"`)
    await queryRunner.query(`ALTER TABLE "schema_to_basket" DROP CONSTRAINT "FK_be9c2c9920f973ae6d9aae41352"`)
    await queryRunner.query(`DROP TABLE "ball"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TYPE "user_role_enum"`)
    await queryRunner.query(`DROP TABLE "basket"`)
    await queryRunner.query(`DROP TABLE "schema_to_basket"`)
    await queryRunner.query(`DROP TYPE "schema_to_basket_priority_enum"`)
    await queryRunner.query(`DROP TABLE "schema"`)
  }

}