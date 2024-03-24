<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[Groups('room')]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups('room')]
    #[ORM\Column(length: 322)]
    private ?string $information = null;

    #[Groups('room')]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dispatch_time = null;
    
    #[Groups('room')]
    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $sender = null;
    
    #[MaxDepth(1)]
    #[ORM\ManyToOne(inversedBy: 'messages')]
    private ?Room $room = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInformation(): ?string
    {
        return $this->information;
    }

    public function setInformation(string $information): static
    {
        $this->information = $information;

        return $this;
    }

    public function getDispatchTime(): ?\DateTimeInterface
    {
        return $this->dispatch_time;
    }

    public function setDispatchTime(\DateTimeInterface $dispatch_time): static
    {
        $this->dispatch_time = $dispatch_time;

        return $this;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): static
    {
        $this->sender = $sender;

        return $this;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(?Room $room): static
    {
        $this->room = $room;

        return $this;
    }
}
