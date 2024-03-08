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