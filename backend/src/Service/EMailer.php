<?php

namespace App\Service;

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
    
    public function sendConfirmMessage(User $user, string $confirmToken)
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
                'key' => $confirmToken
            ]);         

        // и наконец отправляем    
        $this->mailer->send($email);
    }
}
