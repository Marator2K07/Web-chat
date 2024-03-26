<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\RoomRepository;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MessageController extends AbstractController
{
    #[Route('/message/all/get/{roomId}', name: 'app_message_get_for_room', methods: 'GET')]
    public function getNewsMessages(int $roomId,
                                    SerializerInterface $serializer,
                                    RoomRepository $roomRepository): JsonResponse 
    {         
        $room = $roomRepository->findOneByIdField($roomId);
        if (!$room) {
            throw new HttpException(422, 'Не удалось получить данные');
        } 

        return new JsonResponse([
            'messages' => json_decode(
                $serializer->serialize(
                    $room->getMessages(),
                    'json', ['groups' => ['room']]
            ))
        ]);
    }

    #[Route('/message/new', name: 'fewe_Fewef_fewef', methods: 'POST')]
    public function addNewsMessage(Request $request,
                                   EntityManagerInterface $entityManager,
                                   SerializerInterface $serializer,
                                   UserRepository $userRepository,
                                   RoomRepository $roomRepository): JsonResponse 
    {         
        $data = json_decode($request->getContent(), true);
        $room = $roomRepository->findOneByIdField($data['roomId']);
        $user = $userRepository->findOneByUsernameField($data['username']);
        if (!$room || !$user) {
            throw new HttpException(422, 'Не удалось осуществить операцию');
        } 

        $message = new Message();
        $message->setSender($user);
        $room->addMessage($message);
        $currentTime = new DateTimeImmutable();
        $message->setDispatchTime($currentTime);
        $message->setInformation($data['information']);

        $entityManager->persist($message);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Ok',
            'main' => 'Успешно отправлено.',            
            'holding' => false,
            'message' => json_decode(
                $serializer->serialize(
                $message, 'json', ['groups' => ['room']]
            )) 
        ]);
    }
}
