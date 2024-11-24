<?php

namespace Src\Validator;

use Src\Validator\Validator;

class AboutUserValidator implements Validator
{
    public function validate(array $data): mixed
    {
        // подготовка
        $newName = $data[NAME_TAG];
        $newSecondName = $data[SECONDNAME_TAG];
        $newDateOfBirth = $data[BIRTHDAY_TAG];
        $newImage = $data[IMAGE_TAG];
        // непосредственно, валидация (пока хватает и простой)
        $errors = [];
        if ($newName === "") {
            $errors[NAME_TAG] = "Incorrect new name";
        }
        // место для будущей валидации фамилии
        // ...
        if ($newDateOfBirth === INVALID_DATE || $newDateOfBirth === null) {
            $errors[BIRTHDAY_TAG] = "Incorrect birthday";    
        }
        if ($newImage === null) {

        }

        return true;
    }
}