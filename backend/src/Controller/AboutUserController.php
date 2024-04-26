<?php

namespace App\Controller;

use App\Constants\Constants;
use App\Repository\UserRepository;
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
    #[Route('/authorized_user/{username}/about', name: 'app_get_about_authorized_user', methods: 'GET')]
    public function aboutUser(string $username, 
                              SerializerInterface $serializer,
                              UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);
        if (!$user) {
            throw new HttpException(422, 'Не удалось получить данные');
        } else {
            return new JsonResponse([
                'aboutUser' => json_decode(
                    $serializer->serialize(
                        $user->getAboutUser(), 'json'
                    ) 
                )
            ]);
        }
    }   

    #[Route('/authorized_user/{username}/about/update', name: 'app_authorized_update_user', methods: 'POST')]
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

        $newName = $data['name'];         
        if ($newName !== "") {
            $aboutUser->setName($newName); 
        }

        $newSecondName = $data['secondname'];
        if ($newSecondName !== "") {
            $aboutUser->setSecondname($newSecondName); 
        }

        $newDateOfBirth = $data['dateOfBirth'];
        if ($newDateOfBirth !== "Invalid Date") {
            $aboutUser->setDateOfBirth(date_create($newDateOfBirth)); 
        }

        $newImage = $data['image'];
        if ($newImage !== null) {
            $aboutUser->setImage(($newImage)); 
        }

        $entityManager->flush();
                   
        return new JsonResponse([
            'status' => 'Ok',                
            'main' => 'Данные успешно сохранены.',
            'holding' => false,
            'delay' => Constants::SHORT_DELAY
        ]);        
    }
}