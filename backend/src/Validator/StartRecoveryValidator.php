<?php

namespace App\Validator;

class StartRecoveryValidator implements Validator
{
    // классическое регулярное выражение для почты (adres@internet.ru)
    private const EMAIL_REGEX = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';

    public function __construct() {}

    public function validate(array $data): mixed    
    {
        $email = $data[EMAIL_TAG] ?? null;
        $user = $data[USER_TAG] ?? null;
        $errors = [];

        if ($email === null || $email === ""){
            $errors[EMAIL_TAG][] = "Поле ввода почты не должно быть пустым";
        }
        if (!preg_match(self::EMAIL_REGEX, $email)) {
            $errors[EMAIL_TAG][] = "Неверный формат почты (example@sobaka.internet)";
        }
        if ($user === null) {
            $errors[EMAIL_TAG][] = "Пользователя с указанной почтой не существует";
        } else if (!$user->isConfirmed()) {
            $errors[EMAIL_TAG][] = "Сначала проверьте почту и активируйте аккаунт";
        }

        if (count($errors) > 0) {
            return $errors;
        }

        return true;
    }
}