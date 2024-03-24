<?php

namespace App\Entity;

use App\Repository\SubscribersListRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ORM\Entity(repositoryClass: SubscribersListRepository::class)]
class SubscribersList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[MaxDepth(1)]
    #[ORM\OneToMany(mappedBy: 'subscribersList', targetEntity: User::class)]
    private Collection $users;

    #[MaxDepth(1)]
    #[ORM\OneToOne(inversedBy: 'subscribersList', cascade: ['persist', 'remove'])]
    private ?User $owner = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            //if ($user->getSubscribersList() === $this) {
            //    $user->setSubscribersList(null);
            //}
        }

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }
}
