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

export const formParamNotSmall = (formName,
                                  paramName,
                                  userInfo,
                                  setTips) => {
    let formInput = document.forms[formName][paramName];
    if (formInput.value.length <= FORM_INPUT_MIN_TEXT_LENGTH) {
        // пишем подсказку
        setTips(prevState => ({
            ...prevState,
            [paramName]: userInfo
        }))
        return false;
    }    
    // таким образом убираем подсказку
    setTips(nextState => {
        let {password, ...newTips} = nextState;
        return newTips;
    });      
    return true;
}

export const passwordIsRepeated = (formName,
                                   formPassName,
                                   formPassNameAgain,
                                   userInfo,
                                   setTips) => {
    var passInput = document.forms[formName][formPassName];
    var passAgainInput = document.forms[formName][formPassNameAgain];    
    if (passInput.value !== passAgainInput.value) {
        // пишем подсказку
        setTips(prevState => ({
            ...prevState,
            [formPassNameAgain]: userInfo
        }))
        return false;
    }     
    // таким образом убираем подсказку
    setTips(nextState => {
        let {passwordAgain, ...newTips} = nextState;
        return newTips;
    });
    return true;
} 

export const formEmailIsCorrect = (formName,
                                   paramName,
                                   userInfo,
                                   setTips) => {
    let formInput = document.forms[formName][paramName];
    if (!(/^\S+@\S+\.\S+$/.test(formInput.value))) {
        // пишем подсказку
        setTips(prevState => ({
            ...prevState,
            [paramName]: userInfo
        }))
        return false;
    }
    // таким образом убираем подсказку
    setTips(nextState => {
        let {email, ...newTips} = nextState;
        return newTips;
    });
    return true;
}

export function setMenuOffset(idBtn, idMenu) {
    const btnRect = document.getElementById(idBtn).getBoundingClientRect();
    const menuElem = document.getElementById(idMenu);
    menuElem.style.left = btnRect.left - 
                          menuElem.getBoundingClientRect().width +
                          btnRect.width + 10 + "px";   
    menuElem.style.top = btnRect.top +                         
                         btnRect.height - 2 + "px";                          
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