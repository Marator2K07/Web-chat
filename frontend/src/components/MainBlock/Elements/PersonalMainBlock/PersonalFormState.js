import { UPDATE_ABOUT_USER_FORM_NAME } from "../../../../constants";
import { formParamIsEmpty } from "../../../../utils";

export function validUpdateAboutUserForm() {
    let nameIsOk = !formParamIsEmpty(UPDATE_ABOUT_USER_FORM_NAME, 'name');
    return nameIsOk;
}