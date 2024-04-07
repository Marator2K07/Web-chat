import { formParamIsEmpty } from "../../../../utils"

const formName = 'registerForm'

export function checkRegisterForm() {
    let usernameIsOk = !formParamIsEmpty(formName, 'username');
    let emailIsOk = !formParamIsEmpty(formName, 'email');
    let passwordIsOk = !formParamIsEmpty(formName, 'password');
    let passwordAgainIsOk = !formParamIsEmpty(formName, 'passwordAgain');
    return usernameIsOk && emailIsOk && passwordIsOk && passwordAgainIsOk;     
}