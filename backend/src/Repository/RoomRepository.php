<?php

namespace App\Repository;

use App\Entity\Room;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Room>
 *
 * @method Room|null find($id, $lockMode = null, $lockVersion = null)
 * @method Room|null findOneBy(array $criteria, array $orderBy = null)
 * @method Room[]    findAll()
 * @method Room[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RoomRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Room::class);
    }

//    /**
//     * @return Room[] Returns an array of Room objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

    public function findOneByIdField($value): ?Room
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // public function findOneByNewsFieldForUser($user): ?Room
    // {
    //     return $this->createQueryBuilder('r')
    //         ->innerJoin('r.users', 'u', 'WITH', 'u.id = :user_id')
    //         ->setParameter('user_id', $user)
    //         ->where('r.for_news = true')                    
    //         ->getQuery()
    //         ->getOneOrNullResult();
    // }   

    public function findOneByNewsFieldForUser($user): ?Room
    {
        return $this->createQueryBuilder('r')
            ->innerJoin('r.users', 'u', 'WITH', 'u.id = :user_id')
            ->leftJoin('user', 'u', 'WITH', 'u.subscribers_list_id = :list_id')
            ->setParameter('user_id', $user)
            ->setParameter('list_id', $user)
            ->where('r.for_news = true')                    
            ->getQuery()
            ->getOneOrNullResult();
    }   
}
