<?php

namespace App\Validator;

interface Validator
{
    /**
     * Валидация данных для сущности определнного типа
     * @param array $data входящие данные для проверки
     * @return mixed массив ошибок при плохом исходе и истину при корректном
     */
    public function validate(array $data): mixed;
}
