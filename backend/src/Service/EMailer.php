<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class EMailer
{    
    public function __construct(private MailerInterface $mailer,
                                private Environment $twig,
                                private $serverEmail)
    { }
    
    public function sendConfirmMessage(User $user)
    {  
        // хэшируем ключ активации
        $userActivationKey = md5(rand().time());
        // используем специальный шаблон для подтверждения аккаунта
        $messageBody = $this->twig->render('confirmUser.html.twig', [
            'user' => $user, 
            'key' => $userActivationKey
        ]);    
        // составляем сообщение и отправляем    
        $email = (new Email())
            ->from($this->serverEmail)
            ->to($user->getEmail())
            ->subject('Site update just happened!')
            ->text($messageBody);
        $this->mailer->send($email);
    }
}