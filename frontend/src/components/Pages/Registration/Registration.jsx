import React, { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import axios from 'axios'
import classes from './Registration.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock'
import ResponseErrorBlock from '../../ResponseErrorBlock/ResponseErrorBlock'
import LoadingBlock from '../../LoadingBlock/LoadingBlock'
import '../../LoadingBlock/LoadingBlockCSSTransition.css';

const ApiUrl = 'http://127.0.0.1:8000/register';

export default function Registration({userInfo, ...props}) {
    const [passwordRepeat, setPasswordRepeat] = useState(true); 
    const [responce, setResponce] = useState(null);      
    const [error, setError] = useState(null);

    // для анимации загрузки
    const [loading, setLoading] = useState(false);  
    const nodeRef = useRef(null);

    // идентификационные данные
    const [credentials, setCredentials] = useState({
        username: '',
        email: '', 
        password: '',
        passwordAgain: ''           
    });
    // установка изменений в идентификационных данных
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        }); 
    }
    // валидация по размеру и содержанию параметра формы
    function formParamIsEmptyOrSmall(formName, formParamName) {
        var input = document.forms[formName][formParamName];
        if (input.value === '') {            
            input.style.backgroundColor = 'rgb(231, 189, 198)'; 
            input.setAttribute('placeholder', 'Заполните данное поле');
            console.log(input);
            return false;
        } else {
            input.setAttribute('placeholder', '');
            input.style.backgroundColor = 'rgb(232,240,254)';             
            return true;
        }
    }
    // проверка на повторение пароля
    function passwordIsRepeated(formName,
                                formPassName,
                                formPassNameAgain) {
        var passInput = document.forms[formName][formPassName];
        var passAgainInput = document.forms[formName][formPassNameAgain];
        console.log(passInput.value);
        console.log(passAgainInput.value);
        if (passInput.value === passAgainInput.value) {
            setPasswordRepeat(true);
            return true;
        } else {
            
            setPasswordRepeat(false);
            return false;
        }
    } 
    
    // обработка нажатия подтверждения на форме
    async function handleSubmit(e) { 
        e.preventDefault();
        // предпроверка перед отправкой запроса
        let validated = formParamIsEmptyOrSmall('registerForm', 'username');
        if (!formParamIsEmptyOrSmall('registerForm', 'email') && validated) {
            validated = false;
        }
        if (!formParamIsEmptyOrSmall('registerForm', 'password') && validated) {
            validated = false;
        }
        if (!formParamIsEmptyOrSmall('registerForm', 'passwordAgain') && validated) {
            validated = false;
        }
        if (!passwordIsRepeated('registerForm', 'password', 'passwordAgain') && validated) {
            validated = false;
        }
        if (!validated) {
            return;
        }
        // если прошли предпроверку
        setLoading(true)
        await axios.post(ApiUrl, credentials)        
        .then(function (responce) {
            setResponce(responce);
            setLoading(false);
        })
        .catch(function (error) {
            setError(error);
            setLoading(false);
        })
    };

    return (
        <div className='all'>
            <TopBlock pageText='Вход в аккаунт' userInfo={userInfo}/>            
            <MainBlock>
                <div className={classes.Registration} {...props}>
                    <form name='registerForm'>
                        <p>Придумайте имя аккаунта:</p>
                        <input
                        type='username'
                        name='username'
                        value={credentials.username}
                        onChange={handleChange}/>
                        <p>Задайте почту для привязки:</p>
                        <input
                        type='email'
                        name='email'
                        value={credentials.email} 
                        onChange={handleChange}/>
                        <p>А теперь придумайте пароль:</p>
                        <input
                        type='password'
                        name='password'
                        value={credentials.password} 
                        onChange={handleChange}/>
                        {passwordRepeat === true ? <p>И повторите его:</p> : <p>И повторите его (не совпадают):</p>}
                        <input
                        type='password'
                        name='passwordAgain'
                        value={credentials.passwordAgain} 
                        onChange={handleChange}/>
                        <button type='button' onClick={handleSubmit}>Зарегистрироваться</button>
                    </form>
                    {error === null ? '' : <ResponseErrorBlock responseError={error}/>}   
                </div>                         
            </MainBlock>  
            <CSSTransition 
            in={loading}
            nodeRef={nodeRef}
            timeout={250}
            classNames="LoadingBlock">
                <LoadingBlock loading={loading} innerRef={nodeRef}/>
            </CSSTransition>                        
            <DownBlock/>
        </div>
    )
}