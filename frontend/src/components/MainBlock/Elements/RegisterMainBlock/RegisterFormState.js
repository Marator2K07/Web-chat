import { REGISTRATION_FORM_NAME } from "../../../../constants";
import {
    formEmailIsCorrect,
    formParamIsEmpty,
    formParamNotSmall,
    passwordIsRepeated
} from "../../../../utils"

export function validRegisterForm(setTips) {
    let usernameIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'username');
    let emailIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'email') &&
                     validEmail(setTips);
    let passwordIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'password') &&
                        validPassword(setTips);        
    let passwordAgainIsOk = !formParamIsEmpty(REGISTRATION_FORM_NAME, 'passwordAgain') &&
                             validPasswordAgain(setTips);
    return usernameIsOk && emailIsOk && passwordIsOk && passwordAgainIsOk;     
}

export function validEmail(setTips) {
    return formEmailIsCorrect(
        REGISTRATION_FORM_NAME,
        'email',
        "Неверный формат почты",
        setTips
    );
}

export function validPassword(setTips) {
    return formParamNotSmall(
        REGISTRATION_FORM_NAME,
        'password',
        "Пароль слишком короткий",
        setTips
    );
}

export function validPasswordAgain(setTips) {
    return passwordIsRepeated(
        REGISTRATION_FORM_NAME,
        'password',
        'passwordAgain',
        "Пароли не совпадают",
        setTips
    );
}

