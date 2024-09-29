<?php

namespace App\Entity;

use App\Repository\AboutUserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AboutUserRepository::class)]
class AboutUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $secondname = null;   

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $last_activity_datetime = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date_of_birth = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private $image = null;

    // вспомогательное свойство для корректного хранения картинки
    private string $imageStr = "";

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getSecondname(): ?string
    {
        return $this->secondname;
    }

    public function setSecondname(?string $secondname): static
    {
        $this->secondname = $secondname;

        return $this;
    }
    
    public function getLastActivityDatetime(): ?\DateTimeInterface
    {
        return $this->last_activity_datetime;
    }

    public function setLastActivityDatetime(?\DateTimeInterface $last_activity_datetime): static
    {
        $this->last_activity_datetime = $last_activity_datetime;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->date_of_birth;
    }

    public function setDateOfBirth(?\DateTimeInterface $date_of_birth): static
    {
        $this->date_of_birth = $date_of_birth;

        return $this;
    }

    public function getImage()
    {        
        if (is_null($this->image)) {
            return null;
        }   
        return stream_get_contents($this->image);
    }

    public function setImage($image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getImageStr(): string
    {    
        return base64_decode($this->imageStr);
    }

    public function setImageStr($image)
    {
        $this->imageStr = base64_encode($image);
    }
}
