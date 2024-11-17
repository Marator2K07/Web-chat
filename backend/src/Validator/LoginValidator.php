<?php

namespace App\Validator;

class LoginValidator implements Validator
{
    public function __construct() {}

    public function validate(array $data): mixed
    {
        // подготовка
        $loginUsername = $data[USERNAME_TAG];
        $loginPassword = $data[PASSWORD_TAG];
        // непосредственно, валидация
        $errors = [];
        if ($loginUsername === null || $loginUsername === "") {
            $errors[USERNAME_TAG][] = "Никнейм обязателен для ввода";
        }
        if ($loginPassword === null || $loginPassword === "") {
            $errors[PASSWORD_TAG][] = "Пароль обязателен для ввода";
        }

        if (count($errors) > 0) {
            return $errors;
        }

        return true;
    }
}
