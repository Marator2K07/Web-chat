<?php

namespace App\Controller;

use App\Constants\Constants;
use App\Repository\UserRepository;
use App\Service\EMailer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

// НАпоминание: если holding = false,
// то указывается еще одно свойство delay

class RecoveryController extends AbstractController
{
    #[Route('/recovery/start', name: 'app_recovery_start', methods: "POST")]
    public function startRecovery(Request $request, 
                                  UserRepository $userRepository,     
                                  EMailer $emailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneByEmailField($data['email']);
        // если аккаунта с веденной почтой не существует
        if (!$user) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Аккаунта с заданной почтой не существует.',
                'addition' => 'Введите корректный вариант.',
                'holding' => true
            ]);
        }
        // в случае неактивированного аккаунта
        if (!$user->isConfirmed()) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Такой аккаунт существует, но не активирован.',
                'addition' => 'Прежде активируйте аккаунт, и попробуйте снова.',
                'holding' => true
            ]);
        }
        // пытаемся отправить восстановление на почту
        $clientIp = $request->getClientIp();
        $token = md5(rand().time());
        if (!$emailer->sendRecoveryMessage($user, $clientIp, $token)) {
            return new JsonResponse([
                'status' => 'Bad',
                'main' => 'Невозможно отправить восстановление на указанный адрес почты.',
                'addition' => 'Похоже, адрес почты не корректен или не существует.',
                'holding' => true
            ]);
        } 
        
        // если дошли досюда, то все впорядке
        return new JsonResponse(['status' => 'Ok',
            'main' => 'Мы выслали инструкцию для восстановления на указанный емайл.',
            'addition' => 'Просим во время восстановления аккаунта не закрывать данную страницу.',
            'holding' => true,
            'button' => [
                'text' => 'Перейти ко входу',
                'key' => 'loginBlock'
            ]
        ]);
    }
}
