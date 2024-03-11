<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

class AuthenticationController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login', methods: "POST")]
    public function login(Request $request,
                          UserRepository $userRepository,                      
                          UserPasswordHasherInterface $passwordHasher,
                          JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByUsernameField($data['username']);

        if (!$user) {
            return new JsonResponse(['status' => 'Bad',
                'main' => 'Ошибка при входе.',
                'addition' => 'Неверные идентификационные данные.',
                'holding' => true
            ]);
        }

        if (!$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['status' => 'Bad',
                'main' => 'Ошибка при входе.',
                'addition' => 'Неверные идентификационные данные.',
                'holding' => true
            ]);
        }

        if (!$user->isConfirmed()) {
            return new JsonResponse(['status' => 'Bad',
                'main' => 'Ошибка при входе.',
                'addition' => 'Аккаунт не активирован.',
                'holding' => true
            ]);
        } else {
            return new JsonResponse(['status' => 'Ok',
                'main' => 'Успешный вход.',
                'token' => $JWTManager->create($user),
                'link' => '/authorized_user/'.$user->getUsername()
            ]);  
        }         
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function appSignOut(Request $request): JsonResponse
    {
        $session = $request->getSession();
        $session->invalidate();
        return new JsonResponse(['status' => 'Ok', 
            'message' => 'Выход из аккаунта выполнен успешно']);
    }
}
