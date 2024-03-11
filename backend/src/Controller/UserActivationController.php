<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserActivationController extends AbstractController
{
    #[Route('/user_activation', name: 'app_user_activation')]
    public function activation(Request $request,
                               EntityManagerInterface $entityManager,
                               UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByConfirmTokenField($data['confirmToken']);

        if (!$user) {
            return new JsonResponse(['status' => 'Bad',
                'main' => 'Ошибка при активации.',
                'addition' => 'Сбой проверки ключа активации.'
            ]);
        }

        if (!$user->isConfirmed()) {
            $user->setConfirmed(true);
            $entityManager->persist($user);
            $entityManager->flush(); 
            return new JsonResponse(['status' => 'Ok',
                'main' => 'Аккаунт успешно активирован.',
                'addition' => 'Можете закрывать данную страницу.'
            ]); 
        } else {
            return new JsonResponse(['status' => 'Ok',
                'main' => 'Данный аккаунт уже активирован.',
                'addition' => 'Можете закрывать данную страницу.'
            ]); 
        }
    }
}