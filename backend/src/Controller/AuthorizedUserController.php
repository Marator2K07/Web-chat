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
use Symfony\Component\Serializer\SerializerInterface;

class AuthorizedUserController extends AbstractController
{
    #[Route('/authorized_user/get/{username}', name: 'app_authorized_get_user', methods: 'GET')]
    public function identity(string $username,
                             SerializerInterface $serializer,
                             UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);

        if (!$user) {
            throw new HttpException(422, 'Не удалось обновить данные');
        } else {
            return new JsonResponse([
                'status' => 'Ok',                
                'main' => 'Успешная синхронизация.',
                'holding' => false,
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getUsername(),
                    'roles' => $user->getRoles()
                ],
                'aboutUser' => json_decode(
                    $serializer->serialize(
                    $user->getAboutUser(), 'json'
                )),
                'rooms' => json_decode(
                    $serializer->serialize(
                        $user->getRooms(), 'json', ['groups' => ['room']]
                ))
            ]);
        }
    }
    
    #[Route('/authorized_user/news/messages/get/{username}',
        name: 'app_authorized_user_get_news_messages', methods: 'GET')]
    public function getNewsMessages(string $username,
                                    SerializerInterface $serializer,
                                    UserRepository $userRepository,
                                    RoomRepository $roomRepository): JsonResponse 
    {
        $user = $userRepository->findOneByUsernameField($username);
        if (!$user) {
            throw new HttpException(422, 'Не удалось получить данные о пользователе');
        } 
        
        $room = $roomRepository->findOneByNewsFieldForUser($user);
        if (!$room) {
            throw new HttpException(422, 'Не удалось получить данные о комнате общения');
        } 

        return new JsonResponse([
            'messages' => json_decode(
                $serializer->serialize(
                    $room->getMessages(),
                    'json', ['depth' => 1]
            ))
        ]);
    }

    #[Route('/authorized_user/update/{username}', name: 'app_authorized_update_user', methods: 'POST')]
    public function updateUser(string $username,
                               Request $request,
                               EntityManagerInterface $entityManager,
                               UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);  
        $data = json_decode($request->getContent(), true);        
        if (!$user) {
            throw new HttpException(422, 'Не удалось обновить данные');
        }

        $aboutUser = $user->getAboutUser(); 
        $aboutUser->setName($data['name']); 
        $aboutUser->setSecondname($data['secondname']); 
        $aboutUser->setDateOfBirth(date_create($data['dateOfBirth'])); 
        $aboutUser->setImage($data['image']); 
        $aboutUser->setLastActivityDatetime($data['lastActivityDatetime']);

        $entityManager->flush();
                   
        return new JsonResponse([
            'status' => 'Ok',                
            'main' => 'Данные успешно сохранены.',
            'holding' => false
        ]);        
    }
}
