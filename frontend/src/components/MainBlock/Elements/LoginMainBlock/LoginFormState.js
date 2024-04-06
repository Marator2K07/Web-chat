import { formParamIsEmpty } from "../../../../utils"

const formName = 'loginForm' 

export function checkLoginForm() {
    let usernameIsOk = !formParamIsEmpty(formName, 'username');
    let passwordIsOk = !formParamIsEmpty(formName, 'password');
    return usernameIsOk && passwordIsOk; 
}