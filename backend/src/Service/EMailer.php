<?php

namespace App\Service;

use App\Constants\Constants;
use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Twig\Environment;

class EMailer
{    
    public function __construct(private MailerInterface $mailer,
                                private Environment $twig,
                                private $serverEmail)
    { }
    
    public function sendConfirmMessage(User $user,
                                       string $clientIp,
                                       string $confirmToken)
    {  
        // создали основной экземпляр емайл
        $email = (new TemplatedEmail())->
            from($this->serverEmail)->
            to($user->getEmail())->
            subject('Подтверждение регистрации аккаунта');        
        // используем twig шаблон 
        $email->htmlTemplate('confirmUser.html.twig')->
            context([
                'user' => $user, 
                'ip' => $clientIp,
                'port' => Constants::HOST_RECEIVER_PORT,
                'key' => $confirmToken
            ]);

        // и наконец пытаемся отправить активацию       
        try {
            $this->mailer->send($email);
            return true;
        } catch (\Throwable $th) {
            return false;
        }    
    }
}
