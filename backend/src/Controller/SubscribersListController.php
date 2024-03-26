<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

class SubscribersListController extends AbstractController
{
    #[Route('/subscribers_list/add', name: 'app_subscriber_list_add', methods: 'POST')]
    public function addSubscriber(Request $request,
                                  EntityManagerInterface $entityManager,
                                  UserRepository $userRepository,
                                  RoomRepository $roomRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $owner = $userRepository->findOneByUsernameField($data['owner']);
        $subscriber = $userRepository->findOneByUsernameField($data['subscriber']);
        if (!$owner || !$subscriber) {
            throw new HttpException(422, 'Не удалось осуществить операцию');
        }

        $subscribersList = $owner->getSubscribersList();
        $subscribersList->addUser($subscriber);

        $roomForNews = $roomRepository->findOneByNewsFieldForUser($owner);
        $roomForNews->addUser($subscriber);

        $entityManager->flush();        

        return new JsonResponse([
            'status' => 'Ok',                
            'main' => 'Подписка оформлена.',
            'holding' => false
        ]);    
    }

    #[Route('/subscribers_list/remove', name: 'app_subscriber_list_remove', methods: 'POST')]
    public function removeSubscriber(Request $request,
                                     EntityManagerInterface $entityManager,
                                     UserRepository $userRepository,
                                     RoomRepository $roomRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $owner = $userRepository->findOneByUsernameField($data['owner']);
        $subscriber = $userRepository->findOneByUsernameField($data['subscriber']);
        if (!$owner || !$subscriber) {
            throw new HttpException(422, 'Не удалось осуществить операцию');
        }

        $subscribersList = $owner->getSubscribersList();
        $subscribersList->removeUser($subscriber);

        $roomForNews = $roomRepository->findOneByNewsFieldForUser($owner);
        $roomForNews->removeUser($subscriber);

        $entityManager->flush();        

        return new JsonResponse([
            'status' => 'Ok',                
            'main' => 'Подписка убрана.',
            'holding' => false
        ]);    
    }
}
