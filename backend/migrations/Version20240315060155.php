<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240315060155 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649586DFF2');
        $this->addSql('DROP INDEX UNIQ_8D93D649586DFF2 ON user');
        $this->addSql('ALTER TABLE user CHANGE user_info_id about_user_id INT NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D07FE4B4 FOREIGN KEY (about_user_id) REFERENCES about_user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649D07FE4B4 ON user (about_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D07FE4B4');
        $this->addSql('DROP INDEX UNIQ_8D93D649D07FE4B4 ON user');
        $this->addSql('ALTER TABLE user CHANGE about_user_id user_info_id INT NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649586DFF2 FOREIGN KEY (user_info_id) REFERENCES about_user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649586DFF2 ON user (user_info_id)');
    }
}
