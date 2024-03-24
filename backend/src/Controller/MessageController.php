<?php

namespace App\Controller;

use App\Repository\RoomRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MessageController extends AbstractController
{
    #[Route('/message/all/get/{roomId}', name: 'app_messages_get_for_room', methods: 'GET')]
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
                    'json', ['depth' => 1]
            ))
        ]);
    }
}
