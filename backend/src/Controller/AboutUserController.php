<?php

namespace App\Controller;

use App\Constants\Constants;
use App\Repository\UserRepository;
use App\Repository\AboutUserRepository;
use App\Serializer\AboutUserNormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class AboutUserController extends AbstractController
{
    #[Route('/another_user/{username}/about', name: 'app_get_about_another_user', methods: 'GET')]
    public function aboutAnotherUser(string $username, 
                                     SerializerInterface $serializer,
                                     UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);
        $aboutUser = $user->getAboutUser();
        // обработка
        if (!$user || !$aboutUser) {
            return new JsonResponse(null);
        } else {
            // временно храним картинку в корректном для нормалайзера формате
            $img = $aboutUser->getImage();
            $aboutUser->setImageStr($img);

            return new JsonResponse([
                'aboutUser' => 
                    $serializer->normalize(
                        $aboutUser, 'json'                    
                    )
            ]);
        }
    }

    #[Route('/authorized_user/{username}/about', name: 'app_get_about_authorized_user', methods: 'GET')]
    public function aboutCurrentUser(string $username, 
                                     SerializerInterface $serializer,
                                     UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);
        $aboutUser = $user->getAboutUser();
        // обработка
        if (!$user || !$aboutUser) {
            throw new HttpException(422, 'Не удалось получить данные');
        } else {
            // временно храним картинку в корректном для нормалайзера формате
            $img = $aboutUser->getImage();
            $aboutUser->setImageStr($img);
            
            return new JsonResponse([
                'aboutUser' => 
                    $serializer->normalize(
                        $aboutUser, 'json'                    
                    )
            ]);
        }
    }   

    #[Route('/authorized_user/{username}/about/update', name: 'app_authorized_update_user', methods: 'POST')]
    public function updateCurrentUser(string $username,
                                      Request $request,
                                      EntityManagerInterface $entityManager,
                                      UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);  
        $aboutUser = $user->getAboutUser();
        $data = json_decode($request->getContent(), true);
        // предпроверка
        if (!$user || !$aboutUser) {
            throw new HttpException(422, 'Не удалось обновить данные');
        }
        // обработка имени пользователя
        $newName = $data['name'];         
        if ($newName !== "") {
            $aboutUser->setName($newName); 
        }
        // обработка фамилии пользователя (может быть пустым)
        $newSecondName = $data['secondname'];
        $aboutUser->setSecondname($newSecondName); 
        // обработка даты рождения 
        $newDateOfBirth = $data['dateOfBirth'];
        if ($newDateOfBirth !== "Invalid Date") {
            $aboutUser->setDateOfBirth(date_create($newDateOfBirth)); 
        }
        // и наконец обработка аватарки пользователя
        $newImage = $data['image'];
        if ($newImage !== null) {
            $aboutUser->setImage(($newImage)); 
        }
        // применение и возврат положительного результата
        $entityManager->flush();
        return new JsonResponse([
            'status' => 'Ok', 
            'main' => 'Данные успешно сохранены.',
            'holding' => false,
            'delay' => Constants::SHORT_DELAY
        ]);        
    }
}