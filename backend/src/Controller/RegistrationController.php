<?php

namespace App\Controller;

use App\Entity\AboutUser;
use App\Entity\BlackList;
use App\Entity\Room;
use App\Entity\SubscribersList;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EMailer;
use App\Validator\RegistrationValidator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;
use Symfony\Component\Routing\Annotation\Route;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'register', methods: 'POST')]
    public function register(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        UserPasswordHasher $passwordHasher,
        RegistrationValidator $registrationValidator,
        EMailer $emailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $userOne = $userRepository->findOneByUsernameField($data[USERNAME_TAG]);
        $userTwo = $userRepository->findOneByEmailField($data[EMAIL_TAG]);

        $data[COMPARISON_USERNAME_TAG] = $userOne->getUsername();
        $data[COMPARISON_EMAIL_TAG] = $userTwo->getEmail();
        $errors = $registrationValidator->validate($data);
        if (!is_bool($errors)) {
            return new JsonResponse(['validationErrors' => $errors]);
        }

        // создаем пользователя
        $user = new User();
        $user->setUsername($data[USERNAME_TAG]);
        $user->setEmail($data[EMAIL_TAG]);
        $user->setConfirmed(false); // по умолчанию аккаунт не активирован
        $user->setPassword($passwordHasher->hashPassword(
            $user,
            $data[PASSWORD_TAG]
        ));
        $userActivationKey = md5(rand() . time());
        $user->setConfirmToken($userActivationKey);
        // информация о пользователе
        $aboutUser = new AboutUser();
        $aboutUser->setName($data[USERNAME_TAG]);
        $user->setAboutUser($aboutUser);
        // инициализаци новостной комнаты 
        $room = new Room();
        $room->setName('Новости пользователя' . $user->getUsername());
        $room->setDialog(false);
        $room->setForNews(true);
        $room->addUser($user);
        // инициализируем список подписчиков
        $subscribersList = new SubscribersList();
        $subscribersList->setOwner($user);
        $user->setSubscribersList($subscribersList);
        // инициализируем черный список
        $blackList = new BlackList();
        $blackList->setOwner($user);
        $user->setBlackList($blackList);

        // пытаемся отправить активацию на аккаунт
        $clientIp = $request->getClientIp();
        if (!$emailer->sendConfirmMessage(
            $user,
            $clientIp,
            $userActivationKey
        )) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Невозможно отправить активацию на указанный адрес почты.',
                'addition' => 'Похоже, адрес почты не корректен или не существует.',
                'holding' => true
            ]);
        }

        // сохраняем все сущности одним запросом
        $entityManager->persist($user);
        $entityManager->persist($aboutUser);
        $entityManager->persist($room);
        $entityManager->persist($subscribersList);
        $entityManager->persist($blackList);
        $entityManager->flush();

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
