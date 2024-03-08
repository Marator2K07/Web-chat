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
