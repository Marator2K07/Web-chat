<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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