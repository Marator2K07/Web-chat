<?php

namespace App\Repository;

use App\Entity\AboutUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class AboutUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AboutUser::class);
    }

    public function findOneByUserId($userId): ?AboutUser
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.id = :val')
            ->setParameter('val', $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneByUsername(string $username): ?AboutUser
    {
        return $this->createQueryBuilder('au')
            ->join('au.user', 'u')
            ->where('u.username = :username')
            ->setParameter('username', $username)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
