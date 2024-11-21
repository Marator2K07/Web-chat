<?php

namespace App\Validator;

class LoginValidator implements Validator
{
    public function __construct() {}

    public function validate(array $data): mixed
    {
        $username = $data[USERNAME_TAG] ?? null;
        $password = $data[PASSWORD_TAG] ?? null;
        $errors = [];
        
        if ($username === null || $username === "") {
            $errors[USERNAME_TAG][] = "Никнейм обязателен для ввода";
        }
        if ($password === null || $password === "") {
            $errors[PASSWORD_TAG][] = "Пароль обязателен для ввода";
        }

        if (count($errors) > 0) {
            return $errors;
        }

        return true;
    }
}
