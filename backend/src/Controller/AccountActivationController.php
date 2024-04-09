<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class AccountActivationController extends AbstractController
{
    #[Route('/user_activate', name: 'app_user_activate')]
    public function activation(Request $request,
                               EntityManagerInterface $entityManager,
                               UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByConfirmTokenField($data['confirmToken']);

        if (!$user) {
            throw new HttpException(410, 'Аккаунта для активации уже не существует');
        }

        if (!$user->isConfirmed()) {
            $user->setConfirmed(true);
            $entityManager->persist($user);
            $entityManager->flush(); 
            return new JsonResponse(['status' => 'Ok',
                'main' => 'Аккаунт успешно активирован.',
                'addition' => 'Можете закрывать данную страницу.',
                'holding' => true
            ]); 
        } else {
            return new JsonResponse(['status' => 'Ok',
                'main' => 'Данный аккаунт уже активирован.',
                'addition' => 'Можете закрывать данную страницу.',
                'holding' => true
            ]); 
        }
    }
}
