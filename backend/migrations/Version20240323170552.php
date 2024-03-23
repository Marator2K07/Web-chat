<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240323170552 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE black_list (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, UNIQUE INDEX UNIQ_972CB8517E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE subscribers_list (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, UNIQUE INDEX UNIQ_5223CFA97E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE black_list ADD CONSTRAINT FK_972CB8517E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE subscribers_list ADD CONSTRAINT FK_5223CFA97E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD room_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F54177093 FOREIGN KEY (room_id) REFERENCES room (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F54177093 ON message (room_id)');
        $this->addSql('ALTER TABLE user ADD black_list_id INT DEFAULT NULL, ADD subscribers_list_id INT NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64915FBC973 FOREIGN KEY (black_list_id) REFERENCES black_list (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6495EED197E FOREIGN KEY (subscribers_list_id) REFERENCES subscribers_list (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64915FBC973 ON user (black_list_id)');
        $this->addSql('CREATE INDEX IDX_8D93D6495EED197E ON user (subscribers_list_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64915FBC973');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6495EED197E');
        $this->addSql('ALTER TABLE black_list DROP FOREIGN KEY FK_972CB8517E3C61F9');
        $this->addSql('ALTER TABLE subscribers_list DROP FOREIGN KEY FK_5223CFA97E3C61F9');
        $this->addSql('DROP TABLE black_list');
        $this->addSql('DROP TABLE subscribers_list');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F54177093');
        $this->addSql('DROP INDEX IDX_B6BD307F54177093 ON message');
        $this->addSql('ALTER TABLE message DROP room_id');
        $this->addSql('DROP INDEX IDX_8D93D64915FBC973 ON user');
        $this->addSql('DROP INDEX IDX_8D93D6495EED197E ON user');
        $this->addSql('ALTER TABLE user DROP black_list_id, DROP subscribers_list_id');
    }
}
