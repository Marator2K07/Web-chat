<?php

namespace App\Entity;

use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
class Room
{
    #[Groups('room')]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups('room')]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups('users')]
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'rooms')]
    private Collection $users;

    #[Groups('room')]
    #[ORM\Column]
    private ?bool $dialog = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addRoom($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            $user->removeRoom($this);
        }

        return $this;
    }

    public function isDialog(): ?bool
    {
        return $this->dialog;
    }

    public function setDialog(bool $dialog): static
    {
        $this->dialog = $dialog;

        return $this;
    }
}
