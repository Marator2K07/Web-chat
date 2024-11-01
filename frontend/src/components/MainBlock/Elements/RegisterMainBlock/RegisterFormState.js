import { REGISTRATION_FORM_NAME } from "../../../../constants";
import {
    formEmailIsCorrect,
    formParamIsEmpty,
    formParamNotSmall,
    passwordComplicated,
    passwordIsRepeated
} from "../../../../utils"

export function validRegisterForm(problemHandler, addTip, removeTip) {
    let usernameIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'username') &&
        validUsername(addTip, removeTip);
    let emailIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'email') &&
        validEmail(addTip, removeTip);
    let passwordIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'password') &&
        validPassword(addTip, removeTip);
    let passwordAgainIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'passwordAgain') &&
        validPasswordAgain(addTip, removeTip);
    if (usernameIsOk && emailIsOk && passwordIsOk && passwordAgainIsOk) {
        return true;
    } else {
        problemHandler();
        return false;
    }
}

export function validUsername(addTip, removeTip) {
    return formParamNotSmall(
        REGISTRATION_FORM_NAME,
        'username',
        'username1',
        "Слишком короткое имя для аккаунта",
        addTip,
        removeTip,
    );
}

export function validEmail(addTip, removeTip) {
    return formEmailIsCorrect(
        REGISTRATION_FORM_NAME,
        'email',
        'email1',
        "Неверный формат почты",
        addTip,
        removeTip
    );
}

export function validPassword(addTip, removeTip) {
    let passComplicated = passwordComplicated(
        REGISTRATION_FORM_NAME,
        'password',
        'password1',
        "Пароль должен содержать как минимум 8 символов, включая по крайней мере одну строчную букву, одну заглавную букву и одну цифру",
        addTip,
        removeTip
    );
    let passRepeated = passwordIsRepeated(
        REGISTRATION_FORM_NAME,
        'password',
        'passwordAgain',
        'passwordAgain1',
        "Пароли не совпадают",
        addTip,
        removeTip
    );
    return passComplicated && passRepeated;
}

export function validPasswordAgain(addTip, removeTip) {
    let passRepeated = passwordIsRepeated(
        REGISTRATION_FORM_NAME,
        'password',
        'passwordAgain',
        'passwordAgain1',
        "Пароли не совпадают",
        addTip,
        removeTip
    );
    let passComplicated = passwordComplicated(
        REGISTRATION_FORM_NAME,
        'passwordAgain',
        'passwordAgain2',
        "Пароль должен содержать как минимум 8 символов, включая по крайней мере одну строчную букву, одну заглавную букву и одну цифру",
        addTip,
        removeTip
    );
    return passRepeated && passComplicated;
}

