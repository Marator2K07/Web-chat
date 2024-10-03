<?php

namespace App\Controller;

use App\Entity\AboutUser;
use App\Entity\BlackList;
use App\Entity\Room;
use App\Entity\SubscribersList;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EMailer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

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
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Указанное имя аккаунта занято.',
                'holding' => true
            ]);
        }
        // если почта не уникальна 
        $user = $userRepository->findOneByEmailField($data['email']);
        if ($user) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Заданная почта уже использовалась при регистрации.',
                'holding' => true
            ]);
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
        // пытаемся отправить активацию на аккаунт
        $clientIp = $request->getClientIp();
        if (!$emailer->sendConfirmMessage($user,
                                          $clientIp,
                                          $userActivationKey)) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Невозможно отправить активацию на указанный адрес почты.',
                'addition' => 'Похоже, адрес почты не корректен или не существует.',
                'holding' => true
            ]);
        } 
        // задаем и инициализируем информацию о пользователе
        $aboutUser = new AboutUser();
        // по умолчанию имя пользователя = имя аккаунта
        $aboutUser->setName($data['username']);
        $user->setAboutUser($aboutUser);      
        // инициализируем комнату для новостей
        $room = new Room();
        $room->setName('Новости пользователя'.$user->getUsername());
        $room->setDialog(false);
        $room->setForNews(true);        
        $room->addUser($user);
        // применение 
        $entityManager->persist($room);
        $entityManager->persist($user);
        $entityManager->flush(); 
        // инициализируем список подписчиков
        $subscribersList = new SubscribersList();
        $subscribersList->setOwner($user);
        $user->setSubscribersList($subscribersList);
        $entityManager->persist($subscribersList);
        $entityManager->flush();
        // инициализируем черный список
        $blackList = new BlackList();
        $blackList->setOwner($user);        
        $user->setBlackList($blackList);
        $entityManager->persist($blackList);
        $entityManager->flush(); 
        
        // если дошли досюда, то все впорядке
        return new JsonResponse([
            'status' => 'Ok',
            'main' => 'Мы выслали подверждение на указанный при регистрации емайл.',
            'addition' => 'Чтобы зайти под своим новым аккаунтом, нужно сначала активировать его.',
            'holding' => true,
            'button' => [
                'text' => 'Перейти ко входу',
                'key' => 'loginBlock'
            ]
        ]);
    }
}
