<?php

namespace App\Controller;

use App\Entity\AboutUser;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EMailer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: "POST")]
    public function register(Request $request, 
                             UserRepository $userRepository,     
                             EntityManagerInterface $entityManager,
                             EMailer $emailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // если имя не уникально 
        $user = $userRepository->findOneByUsernameField($data['username']);
        if ($user) {
            throw new HttpException(409, 'Заданное имя аккаунта занято');
        }
        // если почта не уникальна 
        $user = $userRepository->findOneByEmailField($data['email']);
        if ($user) {
            throw new HttpException(409, 'Данная почта уже использовалась при регистрации.');
        }

        // задаем и инициализируем нового пользователя
        $user = new User();
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setConfirmed(false); // по умолчанию аккаунт не активирован
        $user->setPassword($data['password']);
        // хэшируем ключ активации и сохраняем
        $userActivationKey = md5(rand().time());
        $user->setConfirmToken($userActivationKey);
        
        // задаем и инициализируем информацию о пользователе
        $aboutUser = new AboutUser();
        // по умолчанию имя пользователя = имя аккаунта
        $aboutUser->setName($data['username']);
        $user->setAboutUser($aboutUser);

        $entityManager->persist($user);
        $entityManager->flush();        
        $emailer->sendConfirmMessage($user, $userActivationKey);

        return new JsonResponse(['status' => 'Ok',
            'main' => 'Мы выслали подверждение на указанный при регистрации емайл.',
            'addition' => 'Чтобы зайти под своим новым аккаунтом, нужно сначала активировать его.',
            'holding' => true,
            'button' => [
                'text' => 'Перейти ко входу',
                'key' => 'loginRoot'
            ]
        ]);
    }
}
