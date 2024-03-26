<?php

namespace App\Controller;

use App\Entity\Room;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

class RoomController extends AbstractController
{
    #[Route('/room/new', name: 'app_message_new_for_room', methods: 'POST')]
    public function addNewsMessage(Request $request,
                                   EntityManagerInterface $entityManager,
                                   UserRepository $userRepository): JsonResponse 
    {         
        // roomName: newRoomName,
        // author: user,
        // users: selectedUsers 

        $data = json_decode($request->getContent(), true);
        $roomName = $data['roomName'];
        $initiator = $userRepository->findOneByUsernameField($data['author']['username']);
        $otherUsers = $data['users'];
        if (!$initiator || !$roomName) {
            throw new HttpException(422, 'Не удалось осуществить операцию');            
        } 

        $room = new Room();
        $room->setName($roomName);
        $room->setDialog(false); // пока так
        $room->setForNews(false); 
        $room->addUser($initiator);
        foreach ($otherUsers as $key => $value) {
            $user = $userRepository->findOneByUsernameField($value['username']);
            $room->addUser($user);
        }        

        $entityManager->persist($room);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Ok',
            'main' => 'Комната успешно создана.',            
            'holding' => false
        ]);
    }
}
