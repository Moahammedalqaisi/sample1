import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1767563296289 implements MigrationInterface {
  name = 'SchemaUpdate1767563296289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`expense\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`taxPercentage\` decimal(5,2) NOT NULL, \`notes\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`expense\``);
  }
}
