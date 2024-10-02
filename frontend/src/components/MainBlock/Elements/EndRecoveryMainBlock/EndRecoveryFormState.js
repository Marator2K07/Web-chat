import { END_RECOVERY_FORM_NAME } from "../../../../constants";
import {
    formParamIsEmpty,
    formParamNotSmall,
    passwordIsRepeated 
} from "../../../../utils";

export function validEndRecoveryForm(setTips) {
    let usernameIsOk = !formParamIsEmpty(END_RECOVERY_FORM_NAME, 'username');
    let passwordIsOk = !formParamIsEmpty(END_RECOVERY_FORM_NAME, 'password') &&
                        validPassword(setTips);
    let passwordAgainIsOk = !formParamIsEmpty(END_RECOVERY_FORM_NAME,'passwordAgain') && 
                             validPasswordAgain(setTips);
    return usernameIsOk && passwordIsOk && passwordAgainIsOk;
}

export function validPassword(setTips) {
    return formParamNotSmall(
        END_RECOVERY_FORM_NAME,
        'password',
        "Пароль слишком короткий",
        setTips
    );
}

export function validPasswordAgain(setTips) {
    return passwordIsRepeated(
        END_RECOVERY_FORM_NAME,
        'password',
        'passwordAgain',
        "Пароли не совпадают",
        setTips
    );
}