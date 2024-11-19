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
    #[Route('/user_activate', name: 'user_activation')]
    public function activation(
        Request $request,
        EntityManagerInterface $entityManager,
        UserRepository $userRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByConfirmTokenField($data[CONFIRMTOKEN_TAG]);

        if (!$user) {
            throw new HttpException(
                GONE_STATUS_CODE,
                'Аккаунта для активации уже не существует'
            );
        }

        if (!$user->isConfirmed()) {
            $user->setConfirmed(true);
            $entityManager->flush();

            return new JsonResponse([
                'status' => 'Ok',
                'main' => 'Аккаунт успешно активирован.',
                'addition' => 'Данная вкладка закроется автоматически через короткое время.',
                'holding' => false,
                'delay' => EXTRA_LONG_DELAY,
                'closeTab' => true
            ]);
        } else {
            return new JsonResponse([
                'status' => 'Ok',
                'main' => 'Данный аккаунт уже активирован.',
                'addition' => 'Эта вкладка закроется автоматически через короткое время.',
                'holding' => false,
                'delay' => EXTRA_LONG_DELAY,
                'closeTab' => true
            ]);
        }
    }
}
