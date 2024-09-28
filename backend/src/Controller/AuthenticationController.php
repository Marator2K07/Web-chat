<?php

namespace App\Controller;

use App\Constants\Constants;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class AuthenticationController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login', methods: "POST")]
    public function login(Request $request,
                          UserRepository $userRepository,                      
                          UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByUsernameField($data['username']);
        // в случае ошибочного ввода
        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Неверные идентификационные данные.',
                'holding' => true
            ]);
        }
        // в случае не активации аккаунта
        if (!$user->isConfirmed()) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Невозможно осуществить вход.',
                'addition' => 'Аккаунт не активирован.',
                'holding' => true
            ]);
        }

        // если дошли до сюда, то все впорядке
        return new JsonResponse([
            'main' => 'Успешный вход.',
            'holding' => false,
            'delay' => Constants::SHORT_DELAY
        ]); 
    }

    // для выхода из аккаунта уже есть метод 
    // с рутом: /api/token/invalidate
}
