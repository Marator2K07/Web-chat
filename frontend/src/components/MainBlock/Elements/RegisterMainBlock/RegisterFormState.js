import {
    formEmailIsCorrect,
    formParamIsEmpty,
    formParamNotSmall,
    passwordIsRepeated
} from "../../../../utils"

const formName = 'registerForm'

export function validRegisterForm(setTips) {
    let usernameIsOk = !formParamIsEmpty(formName, 'username');
    let emailIsOk = !formParamIsEmpty(formName, 'email') &&
                     validEmail(setTips);
    let passwordIsOk = !formParamIsEmpty(formName, 'password') &&
                        validPassword(setTips);        
    let passwordAgainIsOk = !formParamIsEmpty(formName, 'passwordAgain') &&
                             validPasswordAgain(setTips);
    return usernameIsOk && emailIsOk && passwordIsOk && passwordAgainIsOk;     
}

export function validEmail(setTips) {
    return formEmailIsCorrect(
        formName,
        'email',
        "Неверный формат почты",
        setTips
    );
}

export function validPassword(setTips) {
    return formParamNotSmall(
        formName,
        'password',
        "Пароль слишком короткий",
        setTips
    );
}

export function validPasswordAgain(setTips) {
    return passwordIsRepeated(
        formName,
        'password',
        'passwordAgain',
        "Пароли не совпадают",
        setTips
    );
}

