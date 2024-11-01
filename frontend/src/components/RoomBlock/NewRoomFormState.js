import { NEW_ROOM_FORM_NAME } from "../../constants";
import { formParamIsEmpty, formParamNotSmall } from "../../utils";

export function validNewRoomForm(problemHandler, addTip, removeTip) {
    let roomNameIsOk = !formParamIsEmpty(NEW_ROOM_FORM_NAME, 'roomName')
        && validRoomName(addTip, removeTip);
    if (roomNameIsOk) {
        return true;
    } else {
        problemHandler();
        return false;
    }
}

export function validRoomName(addTip, removeTip) {
    return formParamNotSmall(
        NEW_ROOM_FORM_NAME,
        'roomName',
        'roomName1',
        "Слишком короткое название комнаты",
        addTip,
        removeTip
    );
}