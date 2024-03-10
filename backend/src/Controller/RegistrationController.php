<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\EMailer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: "POST")]
    public function register(Request $request,   
                             EntityManagerInterface $entityManager,
                             EMailer $emailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        // задаем и инициализируем нового пользователя
        $user = new User();
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setConfirmed(false); // по умолчанию аккаунт не активирован
        $user->setPassword($data['password']);
        
        $entityManager->persist($user);
        $entityManager->flush();        
        $emailer->sendConfirmMessage($user);

        return new JsonResponse(['status' => 'Ok',
            'main' => 'Мы выслали подверждение на указанный при регистрации емайл.',
            'addition' => 'Чтобы зайти под своим новым аккаунтом, нужно сначала активировать его.',
            'button' => [
                'text' => 'Перейти ко входу',
                'key' => 'loginRoot'
            ]
        ]);
    }
}
