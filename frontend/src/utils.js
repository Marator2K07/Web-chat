import {
    FORM_INPUT_MIN_TEXT_LENGTH,
    FORM_INPUT_NORMAL_COLOR,
    FORM_INPUT_WARNING_COLOR,
    FORM_INPUT_WARNING_MESSAGE
} from "./constants";

export const formParamIsEmpty = (formName, paramName) => {
    var formInput = document.forms[formName][paramName];
    if (formInput.value === '') {
        formInput.style.backgroundColor = FORM_INPUT_WARNING_COLOR; 
        formInput.setAttribute('placeholder', FORM_INPUT_WARNING_MESSAGE);
        return true;
    } else {
        formInput.setAttribute('placeholder', '');
        formInput.style.backgroundColor = FORM_INPUT_NORMAL_COLOR;             
        return false;
    }
}

export const tipForInput = (tipName,
                            tipInfo,
                            addTip,
                            removeTip,
                            flag) => {
    if (flag) {
        addTip(tipName, tipInfo);
        return false;
    }    
    removeTip(tipName);  
    return true;
};

export const formParamNotSmall = (formName,
                                  formParamName,
                                  tipName,
                                  tipInfo,
                                  addTip,
                                  removeTip) => {
    let formInput = document.forms[formName][formParamName];
    if (formInput.value.length <= FORM_INPUT_MIN_TEXT_LENGTH) {
        addTip(tipName, tipInfo);
        return false;
    }    
    removeTip(tipName);  
    return true;
}

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const passwordComplicated = (formName,
                                    formParamName,
                                    tipName,
                                    tipInfo,
                                    addTip,
                                    removeTip) => {
    let formInput = document.forms[formName][formParamName];
    if (!strongPasswordRegex.test(formInput.value)) {
        addTip(tipName, tipInfo);
        return false;
    }
    removeTip(tipName);
    return true;
}

export const passwordIsRepeated = (formName,
                                   formParamName,
                                   formParamAgain,
                                   tipName,
                                   tipInfo,
                                   addTip,
                                   removeTip) => {
    var passInput = document.forms[formName][formParamName];
    var passAgainInput = document.forms[formName][formParamAgain];    
    if (passInput.value !== passAgainInput.value) {
        addTip(tipName, tipInfo);
        return false;
    }     
    removeTip(tipName);
    return true;
} 

export const formEmailIsCorrect = (formName,
                                   formParamName,
                                   tipName,
                                   tipInfo,
                                   addTip,
                                   removeTip) => {
    let formInput = document.forms[formName][formParamName];
    if (!(/^\S+@\S+\.\S+$/.test(formInput.value))) {
        addTip(tipName, tipInfo);
        return false;
    }
    removeTip(tipName);
    return true;
}

export function setMenuOffset(idBtn, idMenu) {
    let btnElem = document.getElementById(idBtn);
    let menuElem = document.getElementById(idMenu);
    if (btnElem && menuElem) {
        menuElem.style.left = btnElem.getBoundingClientRect().left - 
                            menuElem.getBoundingClientRect().width +
                            btnElem.getBoundingClientRect().width + "px";   
        menuElem.style.top = btnElem.getBoundingClientRect().top + 
                            btnElem.getBoundingClientRect().height - 2 + "px";    
    } 
}

export function getElementWidthById(elemId) {
    let elem = document.getElementById(elemId);
    return window.getComputedStyle(elem).width;
}

const reader = new FileReader();
export const convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
            console.log(reader.result);
        };
        reader.readAsDataURL(blob);
})

export const convertBase64ToBlob = async (base64Data) => {
    let base64 = await fetch(base64Data);
    return await base64.blob();  
}