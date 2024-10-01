import { START_RECOVERY_FORM_NAME } from "../../../../constants";
import { formEmailIsCorrect, formParamIsEmpty } from "../../../../utils";

export function validStartRecoveryForm(setTips) {
    let emailIsOk = !formParamIsEmpty(START_RECOVERY_FORM_NAME, 'email') &&
                     validEmail(setTips);
    return emailIsOk;
}

export function validEmail(setTips) {
    return formEmailIsCorrect(
        START_RECOVERY_FORM_NAME,
        'email',
        "Неверный формат",
        setTips
    );
}