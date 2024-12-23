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
    // классическое регулярное выражение для почты (adres@internet.ru)
    private const EMAIL_REGEX = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';

    public function __construct() {}

    public function validate(array $data): mixed
    {
        $errors = [];

        $errors = array_merge($errors, $this->validateUsername($data));
        $errors = array_merge($errors, $this->validateEmail($data));
        $errors = array_merge($errors, $this->validatePassword($data));
        $errors = array_merge($errors, $this->validatePasswordAgain($data));

        if (count($errors) > 0) {
            return $errors;
        }

        return true;
    }

    private function validateUsername(array $data): array
    {
        $username = $data[USERNAME_TAG] ?? null;
        $comparisonUsername = $data[COMPARISON_USERNAME_TAG] ?? null;
        $errors = [];

        if ($username === null || $username === "") {
            $errors[USERNAME_TAG][] = "Никнейм обязателен для ввода";
        }
        if ($username === $comparisonUsername) {
            $errors[USERNAME_TAG][] = "Данный никнейм уже занят";
        }

        return $errors;
    }

    private function validateEmail(array $data): array
    {
        $email = $data[EMAIL_TAG] ?? null;
        $comparisonEmail = $data[COMPARISON_EMAIL_TAG] ?? null;
        $errors = [];

        if ($email === null || $email === "") {
            $errors[EMAIL_TAG][] = "Почта обязательна для ввода";
        }
        if ($email === $comparisonEmail) {
            $errors[EMAIL_TAG][] = "Выбранная почта уже используется";
        }
        if (!preg_match(self::EMAIL_REGEX, $email)) {
            $errors[EMAIL_TAG][] = "Неверный формат почты (example@sobaka.internet)";
        }

        return $errors;
    }

    private function validatePassword(array $data): array
    {
        $password = $data[PASSWORD_TAG] ?? null;
        $errors = [];

        if ($password === null || $password === "") {
            $errors[PASSWORD_TAG][] = "Поле пароля не может быть пустым";
        }
        if (!preg_match(self::PASSWORD_REGEX, $password)) {
            $errors[PASSWORD_TAG][] = "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы (@$!%*?&)";
        }

        return $errors;
    }

    private function validatePasswordAgain(array $data): array
    {
        $password = $data[PASSWORD_TAG] ?? null;
        $passwordAgain = $data[PASSWORDAGAIN_TAG] ?? null;
        $errors = [];

        if ($password !== $passwordAgain) {
            $errors[PASSWORDAGAIN_TAG][] = "Пароли не совпадают";
        }

        return $errors;
    }
}
