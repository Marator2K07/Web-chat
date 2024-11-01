import { START_RECOVERY_FORM_NAME } from "../../../../constants";
import { formEmailIsCorrect, formParamIsEmpty } from "../../../../utils";

export function validStartRecoveryForm(problemHandler, addTip, removeTip) {
    let emailIsOk = !formParamIsEmpty(START_RECOVERY_FORM_NAME, 'email') &&
        validEmail(addTip, removeTip);
    if (emailIsOk) {
        return true;
    } else {
        problemHandler();
        return false;
    }
}

export function validEmail(addTip, removeTip) {
    return formEmailIsCorrect(
        START_RECOVERY_FORM_NAME,
        'email',
        'email1',
        "Неверный формат",
        addTip,
        removeTip
    );
}