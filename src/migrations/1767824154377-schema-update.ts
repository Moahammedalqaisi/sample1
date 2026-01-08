import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1767824154377 implements MigrationInterface {
    name = 'SchemaUpdate1767824154377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`claim\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`amount\` decimal(10,2) NOT NULL DEFAULT '0.00', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD \`claimId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_77a879c56c49dab3f5e53c68c7c\` FOREIGN KEY (\`claimId\`) REFERENCES \`claim\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_77a879c56c49dab3f5e53c68c7c\``);
        await queryRunner.query(`ALTER TABLE \`expense\` DROP COLUMN \`claimId\``);
        await queryRunner.query(`DROP TABLE \`claim\``);
    }

}
