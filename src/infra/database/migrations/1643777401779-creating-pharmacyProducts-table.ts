import {MigrationInterface, QueryRunner} from "typeorm";

export class creatingPharmacyProductsTable1643777401779 implements MigrationInterface {
    name = 'creatingPharmacyProductsTable1643777401779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pharmacyProducts\` (\`id\` varchar(36) NOT NULL, \`productId\` varchar(255) NOT NULL, \`unitsInStock\` int NOT NULL, \`pharmacyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pharmacyProducts\` ADD CONSTRAINT \`FK_157c0b2776a8e906e08480f493e\` FOREIGN KEY (\`pharmacyId\`) REFERENCES \`pharmacy\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pharmacyProducts\` DROP FOREIGN KEY \`FK_157c0b2776a8e906e08480f493e\``);
        await queryRunner.query(`DROP TABLE \`pharmacyProducts\``);
    }

}
