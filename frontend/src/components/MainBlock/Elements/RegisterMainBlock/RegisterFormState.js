import {
    formEmailIsCorrect,
    formParamIsEmpty,
    formParamIsSmall,
    passwordIsRepeated
} from "../../../../utils"

const formName = 'registerForm'

export function validRegisterForm(setTips) {
    let usernameIsOk = !formParamIsEmpty(formName, 'username');
    let emailIsOk = !formParamIsEmpty(formName, 'email') && 
        formEmailIsCorrect(
            formName,
            'email',
            "Неверный формат почты",
            setTips
        );
    let passwordIsOk = !formParamIsEmpty(formName, 'password') &&
        !formParamIsSmall(
            formName,
            'password',
            "Пароль слишком короткий",
            setTips
        );
    let passwordAgainIsOk = !formParamIsEmpty(formName, 'passwordAgain') &&
        passwordIsRepeated(
            formName,
            'password',
            'passwordAgain',
            "Пароли не совпадают",
            setTips
        );
    return usernameIsOk && emailIsOk && passwordIsOk && passwordAgainIsOk;     
}