import { formParamIsEmpty } from "../../../../utils"

const formName = 'loginForm' 

export function validLoginForm() {
    let usernameIsOk = !formParamIsEmpty(formName, 'username');
    let passwordIsOk = !formParamIsEmpty(formName, 'password');
    return usernameIsOk && passwordIsOk; 
}