<?php

namespace App\Validator;

class RegistrationValidator implements Validator
{
    // (?=.*[a-z]): Должна быть хотя бы одна строчная буква.
    // (?=.*[A-Z]): Должна быть хотя бы одна заглавная буква.
    // (?=.*\d): Должна быть хотя бы одна цифра.
    // (?=.*[@$!%*?&]): Должен быть хотя бы один специальный символ из указанного набора.
    // [A-Za-z\d@$!%*?&]{8,}$: Должно быть минимум 8 символов из указанного набора (буквы, цифры и специальные символы).
    private const PASSWORD_REGEX = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
    private const EMAIL_REGEX = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';

    public function __construct() {}

    public function validate(array $data): mixed
    {
        // подготовка
        $username = $data[USERNAME_TAG];
        $comparisonUsername = $data[COMPARISON_USERNAME_TAG];
        $email = $data[EMAIL_TAG];
        $comparisonEmail = $data[COMPARISON_EMAIL_TAG];
        $password = $data[PASSWORD_TAG];
        $passwordAgain = $data[PASSWORDAGAIN_TAG];
        // непосредственно, валидация
        $errors = [];
        if ($username === null || $username === "") {
            $errors[USERNAME_TAG][] = "Никнейм обязателен для ввода";
        } else if ($username !== $comparisonUsername) {
            $errors[USERNAME_TAG][] = "Данный никнейм уже занят";
        }
        if ($email === null || $email === "") {
            $errors[EMAIL_TAG][] = "Почта обязательна для ввода";
        } else if ($email !== $comparisonEmail) {
            $errors[EMAIL_TAG][] = "Выбранная почта уже используется";
        } else if (!preg_match(self::EMAIL_REGEX, $email)) {
            $errors[EMAIL_TAG][] = "Неверный формат почты (example@sobaka.internet)";
        }
        if ($password === null || $password === "") {
            $errors[PASSWORD_TAG][] = "Поле пароля не может быть пустым";
        } else if (!preg_match(self::PASSWORD_REGEX, $password)) {
            $errors[PASSWORD_TAG][] = "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы (@$!%*?&)";
        }
        if ($password !== $passwordAgain) {
            $errors[PASSWORDAGAIN_TAG][] = "Пароли не совпадают";
        }

        if (count($errors) > 0) {
            return $errors;
        }

        return true;
    }
}
