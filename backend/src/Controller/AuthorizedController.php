<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AuthorizedController extends AbstractController
{
    #[Route('/authorized_user/{username}', name: 'app_authorized_user', methods: 'GET')]
    public function identity(string $username,
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
                ]
            ]);
        }
    }
}
