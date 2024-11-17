<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Validator\LoginValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class AuthenticationController extends AbstractController
{
    #[Route(path: '/login', name: 'login', methods: 'POST')]
    public function login(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        LoginValidator $loginValidator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByUsernameField($data[USERNAME_TAG]);

        $errors = $loginValidator->validate($data);
        if (!is_bool($errors)) {
            return new JsonResponse(['validationErrors' => $errors]);
        }

        if (!$user || !$passwordHasher->isPasswordValid($user, $data[PASSWORD_TAG])) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Неверные идентификационные данные.',
                'addition' => 'Если забыли данные для входа - переходите на вкладку восстановления.',
                'holding' => true,
                'button' => [
                    'text' => 'Восстановление',
                    'key' => 'recoveryBlock'
                ]
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
            'status' => 'Ok',
            'main' => 'Успешный вход.',
            'holding' => false,
            'delay' => SHORT_DELAY
        ]);
    }

    // для выхода из аккаунта уже есть метод 
    // с рутом: /api/token/invalidate
}
