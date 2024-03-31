import React, { useState } from 'react'
import classes from './LoginMainBlock.module.css'
import { formParamIsEmpty } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { cookies } from '../../../../contexts/CookieContext';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import {
    AFTER_LOGIN_PATH,
    FIVE_MIN_AGE,
    LOGIN_CHECK_URL,
    LOGIN_URL,
    ONE_MONTH_AGE
} from '../../../../constants';
import Scrollable from '../../../Scrollable/Scrollable';

export default function LoginMainBlock({...props}) {
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const navigate = useNavigate();
    
    // идентификационные данные
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    }); 

    // установка изменений в идентификационных данных
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    // обработка формы
    async function handleSubmit(e) {
        e.preventDefault();
        // предпроверка перед отправкой запроса
        let validated = true;
        let usernameOk = !formParamIsEmpty('loginForm', 'username');
        let passwordOk = !formParamIsEmpty('loginForm', 'password');     
        validated = (usernameOk && passwordOk && validated); 
        if (!validated) {
            return;
        }
        
        // основная часть
        startLoading();
        resetResult();
        await makePostRequest(
            LOGIN_URL,
            credentials,
            async () => {
                await makePostRequest(
                    LOGIN_CHECK_URL,
                    credentials,
                    (response) => {
                        const { token, refreshToken } = response.data;                 
                        cookies.set('username', credentials.username, { maxAge: ONE_MONTH_AGE });
                        cookies.set('refreshToken', refreshToken, { maxAge: ONE_MONTH_AGE });
                        cookies.set('token', token, { maxAge: FIVE_MIN_AGE });                        
                        toggleHolding(false, 0);
                        resetResult();
                        navigate(`${AFTER_LOGIN_PATH}/${credentials.username}`);                        
                    }
                )                
            });
        stopLoading();
    };

    return (
        <div className={classes.LoginMainBlock} {...props}>
            <Scrollable>
            <form name='loginForm'>
                <h4>Введите имя аккаунта:</h4>
                <input
                    type='username'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}/>
                <h4>А теперь пароль:</h4>    
                <input
                    type='password'
                    name='password'
                    value={credentials.password}                     
                    onChange={handleChange}/>
                <button type='button' onClick={handleSubmit}>Войти</button>
            </form> 
            </Scrollable>                
        </div>
    )
}
