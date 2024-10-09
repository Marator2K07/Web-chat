import { UPDATE_ABOUT_USER_FORM_NAME } from "../../../../constants";
import { formParamIsEmpty, tipForInput } from "../../../../utils";

export function validUpdateAboutUserForm(problemHandler) {
    let nameIsOk = !formParamIsEmpty(UPDATE_ABOUT_USER_FORM_NAME, 'name');
    if (nameIsOk) {
        return true;
    } else {
        problemHandler();
        return false;
    }
}

export function tipForSecondname(addTip, removeTip, flag) {
    tipForInput(
        'secondname1',
        "Данное поле не является обязательным для заполнения",
        addTip,
        removeTip,
        flag
    )
}