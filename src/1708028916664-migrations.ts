import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708028916664 implements MigrationInterface {
    name = 'Migrations1708028916664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "from_user_id" integer, "to_channel_id" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL DEFAULT '', "is_verified" boolean NOT NULL DEFAULT false, "subscribers_count" integer NOT NULL DEFAULT '0', "text" character varying NOT NULL DEFAULT '', "avatar_path" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "video" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "is_public" boolean NOT NULL DEFAULT false, "views" integer NOT NULL DEFAULT '0', "likes" integer NOT NULL DEFAULT '0', "duration" integer NOT NULL DEFAULT '0', "description" text NOT NULL DEFAULT '', "video_path" character varying NOT NULL DEFAULT '', "thumbnail_path" character varying NOT NULL DEFAULT '', "user_id" integer, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_da7860d5d546514662051dfc96b" FOREIGN KEY ("from_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_94c2e58fd889c5fc2f7cbf1080f" FOREIGN KEY ("to_channel_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_0c06b8d2494611b35c67296356c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_0c06b8d2494611b35c67296356c"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_94c2e58fd889c5fc2f7cbf1080f"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_da7860d5d546514662051dfc96b"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
    }

}
