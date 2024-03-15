<?php

namespace App\Controller;

use App\Entity\AboutUser;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AuthorizedController extends AbstractController
{
    #[Route('/authorized_user/{username}', name: 'app_authorized_user', methods: 'GET')]
    public function identity(string $username,
                             SerializerInterface $serializer,
                             UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->findOneByUsernameField($username);

        if (!$user) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Непредвиденная ошибка.',
                'addition' => 'Ошибка загрузки данных.'
            ]);
        } else {            
            return new JsonResponse([
                'status' => 'Ok',                
                'main' => 'Успешная синхронизация.',
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getUsername(),
                    'roles' => $user->getRoles()
                ],
                'aboutUser' => json_decode(
                    $serializer->serialize(
                    $user->getAboutUser(), 'json'
                ))
            ]);
        }
    }
}
