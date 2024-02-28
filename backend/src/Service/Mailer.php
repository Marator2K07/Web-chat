<?php

namespace App\Service;

use Swift_Mailer;
use Swift_Message;

final class Mailer
{
    public const MAIN_ADRESS = 'Awesome.Chat.php.zone';
    private Swift_Mailer $mailer;

    public function __construct(Swift_Mailer $mailer)  {
        $this->mailer = $mailer;
    }    
}
