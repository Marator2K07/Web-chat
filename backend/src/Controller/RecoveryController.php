<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\EMailer;
use App\Validator\EndRecoveryValidator;
use App\Validator\StartRecoveryValidator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class RecoveryController extends AbstractController
{
    #[Route('/recovery/start', name: 'recovery_start', methods: 'POST')]
    public function start(
        Request $request,
        UserRepository $userRepository,
        StartRecoveryValidator $startRecoveryValidator,
        EMailer $emailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByEmailField($data[EMAIL_TAG]);

        $data[USER_TAG] = $user ? $user : null;
        $errors = $startRecoveryValidator->validate($data);
        if (!is_bool($errors)) {
            return new JsonResponse(['validationErrors' => $errors]);
        }

        // пытаемся отправить восстановление на почту
        $clientIp = $request->getClientIp();
        $token = md5(rand() . time());
        if (!$emailer->sendRecoveryMessage($user, $clientIp, $token)) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Невозможно отправить восстановление на указанный адрес почты.',
                'addition' => 'Похоже, адрес почты не корректен или не существует.',
                'holding' => true
            ]);
        }

        return new JsonResponse([
            'status' => 'Ok',
            'main' => 'Мы выслали инструкцию для восстановления на указанный емайл.',
            'addition' => 'Просим во время восстановления аккаунта не закрывать данную страницу.',
            'holding' => true,
            'button' => [
                'text' => 'Перейти ко входу',
                'key' => 'loginBlock'
            ]
        ]);
    }

    #[Route('/recovery/synchronize', name: 'synchronize_recovery', methods: 'POST')]
    public function synchronize(
        Request $request,
        SerializerInterface $serializer,
        UserRepository $userRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // расшифровка ключа для идентификации пользователя
        $tokenPos = strpos($data[USERTOKEN_AND_ID_TAG], MAIN_TAG);
        $token = substr($data[USERTOKEN_AND_ID_TAG], 0, $tokenPos);
        $user = $userRepository->findOneByConfirmTokenField($token);

        // пытаемся синхронизировать данные для текущего пользователя
        if (!$user) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Что-то пошло не так...',
                'addition' => 'Попробуйте отправить еще один запрос на восстановление. 
                            Данная вкладка автоматически закроется через скорое время.',
                'holding' => false,
                'delay' => EXTRA_LONG_DELAY,
                'closeTab' => true
            ]);
        }

        return new JsonResponse([
            'status' => 'Ok',
            'main' => 'Соединение подтверждено',
            'holding' => false,
            'delay' => SHORT_DELAY,
            'user' => json_decode(
                $serializer->serialize(
                    $user,
                    'json',
                    ['groups' => ['user']]
                )
            )
        ]);
    }

    #[Route('/recovery/end', name: 'recovery_end', methods: 'POST')]
    public function end(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        EndRecoveryValidator $endRecoveryValidator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByIdField($data[ID_TAG]);

        $errors = $endRecoveryValidator->validate($data);
        if (!is_bool($errors)) {
            return new JsonResponse(['validationErrors' => $errors]);
        }

        // обновляем/применяем новые данные
        $user->setUsername($data[USERNAME_TAG]);
        $user->setPassword($passwordHasher->hashPassword(
            $user,
            $data[PASSWORD_TAG]
        ));
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'status' => 'Ok',
            'main' => 'Восстановление успешно завершено.',
            'addition' => 'Можете заходить с новыми: никнеймом и паролем.
                        Данная вкладка автоматически закроется через скорое время.',
            'holding' => false,
            'delay' => EXTRA_LONG_DELAY,
            'closeTab' => true
        ]);
    }
}
