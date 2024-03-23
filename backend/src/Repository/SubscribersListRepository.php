<?php

namespace App\Repository;

use App\Entity\SubscribersList;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SubscribersList>
 *
 * @method SubscribersList|null find($id, $lockMode = null, $lockVersion = null)
 * @method SubscribersList|null findOneBy(array $criteria, array $orderBy = null)
 * @method SubscribersList[]    findAll()
 * @method SubscribersList[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SubscribersListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SubscribersList::class);
    }

//    /**
//     * @return SubscribersList[] Returns an array of SubscribersList objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SubscribersList
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
