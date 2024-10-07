import { LOGIN_FORM_NAME } from "../../../../constants";
import { formParamIsEmpty } from "../../../../utils"

export function validLoginForm(problemHandler) {
    let usernameIsOk = !formParamIsEmpty(LOGIN_FORM_NAME, 'username');
    let passwordIsOk = !formParamIsEmpty(LOGIN_FORM_NAME, 'password');
    if (usernameIsOk && passwordIsOk) {
        return true;
    } else {
        problemHandler();
        return false;
    }
}