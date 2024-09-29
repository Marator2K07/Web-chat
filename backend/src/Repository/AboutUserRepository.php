<?php

namespace App\Repository;

use App\Entity\AboutUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AboutUser>
 *
 * @method AboutUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method AboutUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method AboutUser[]    findAll()
 * @method AboutUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
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
            ->getOneOrNullResult()
        ;
    }

//    /**
//     * @return AboutUser[] Returns an array of AboutUser objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }
}
