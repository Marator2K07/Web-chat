<?php

namespace App\Repository;

use App\Entity\User;
use App\Constants\Constants;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
* @implements PasswordUpgraderInterface<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    public function findOneByIdField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findOneByUsernameField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.username = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneByEmailField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.email = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneByConfirmTokenField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.confirmToken = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // поиск пользователей по совпадению по полю - никнейм
    public function findManyByUsernameField($thisUserId, $searchStr): array
    {
        return $this->createQueryBuilder('u')
            ->select('u')
            ->andWhere("u.id != :thisUserId")
            ->andWhere("u.username LIKE :searchStr")
            ->setParameter('thisUserId', $thisUserId)
            ->setParameter('searchStr', $searchStr.'%')
            ->orderBy('u.username', 'ASC')
            ->setMaxResults(Constants::DEFAULT_SEARCH_SIZE)
            ->getQuery()
            ->getResult();
    } 

    // поиск пользователей по совпадению по полю - имя
    public function findManyByNameField($thisUserId, $searchStr): array
    {
        return $this->createQueryBuilder('u')
            ->select('u, a') 
            ->join('u.about_user', 'a')
            ->andWhere("u.id != :thisUserId")
            ->andWhere("a.name LIKE :searchStr")
            ->setParameter('thisUserId', $thisUserId)
            ->setParameter('searchStr', $searchStr.'%')
            ->orderBy('a.name', 'ASC')
            ->setMaxResults(Constants::DEFAULT_SEARCH_SIZE)
            ->getQuery()
            ->getResult();
    } 
    
    // поиск пользователей по совпадению по полю - фамилия
    public function findManyBySecondnameField($thisUserId, $searchStr): array
    {
        return $this->createQueryBuilder('u')
            ->select('u, a') 
            ->join('u.about_user', 'a')
            ->andWhere("u.id != :thisUserId")
            ->andWhere("a.secondname LIKE :searchStr")
            ->setParameter('thisUserId', $thisUserId)
            ->setParameter('searchStr', $searchStr.'%')
            ->orderBy('a.secondname', 'ASC')
            ->setMaxResults(Constants::DEFAULT_SEARCH_SIZE)
            ->getQuery()
            ->getResult();
    } 
}
