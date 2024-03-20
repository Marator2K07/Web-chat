export const formParamIsEmpty = (formName, paramName) => {
    var formInput = document.forms[formName][paramName];
    if (formInput.value === '') {
        formInput.style.backgroundColor = 'rgb(231, 189, 198)'; 
        formInput.setAttribute('placeholder', 'Заполните данное поле');
        return true;
    } else {
        formInput.setAttribute('placeholder', '');
        formInput.style.backgroundColor = 'rgb(232, 240, 254)';             
        return false;
    }
}

export const formParamIsSmall = (formName,
                                 paramName,
                                 userInfo,
                                 setTips) => {
    let formInput = document.forms[formName][paramName];
    if (formInput.value.length <= 5) {
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