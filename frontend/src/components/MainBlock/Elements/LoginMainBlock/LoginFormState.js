import { LOGIN_FORM_NAME } from "../../../../constants";
import { formParamIsEmpty } from "../../../../utils"

export function validLoginForm() {
    let usernameIsOk = !formParamIsEmpty(LOGIN_FORM_NAME, 'username');
    let passwordIsOk = !formParamIsEmpty(LOGIN_FORM_NAME, 'password');
    return usernameIsOk && passwordIsOk; 
}