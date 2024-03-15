import React, { useState } from 'react'
import classes from './LoginMainBlock.module.css'
import { formParamIsEmpty } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import WebChatClient from '../../../../WebChatClient';
import { cookies } from '../../../../contexts/CookieContext';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

const loginUrl = '/login';
const getTokensUrl = '/api/login_check';

export default function LoginMainBlock({...props}) {
    const { 
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const { 
        resetResult,
        toggleResponse,
        toggleError
    } = useResponseHandlerContext();
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

    async function handleSubmit(e) {
        e.preventDefault();

        // на всякий случай чистим куки перед входом
        cookies.remove('token');
        cookies.remove('refreshToken');
        cookies.remove('username');

        // предпроверка перед отправкой запроса
        let validated = true;
        let usernameOk = !formParamIsEmpty('loginForm', 'username');
        let passwordOk = !formParamIsEmpty('loginForm', 'password');     
        validated = (usernameOk && passwordOk && validated); 
        if (!validated) {
            return;
        }
        
        // подготовка
        startLoading();
        resetResult();

        // внешний запрос для проверки идентификационных данных
        await WebChatClient.post(loginUrl, credentials)
        .then(async function (response) {         
            toggleResponse(response);
            // внутренний запрос для получения токенов авторизации 
            if (response.data.hasOwnProperty("next_stage")) {
                await WebChatClient.post(getTokensUrl, { ...credentials })
                .then(function (tokens) {
                    const { token, refreshToken } = tokens.data;
                    // сохраняем JWT токен используя куки                 
                    cookies.set('username', credentials.username, { maxAge: 2592000 });
                    cookies.set('token', token, { maxAge: 3600 });
                    cookies.set('refreshToken', refreshToken, { maxAge: 2592000 });
                })
                .catch(function (error) {
                    toggleError(error);
                })
            }
            if (!response.data.hasOwnProperty("holding")) {
                toggleHolding(false, 2500);
            }             
            // если вошли успешно в аккаунт 
            if (response.data.hasOwnProperty("link")) {
                navigate(response.data.link, { replace: true });
            }                          
        })
        .catch(function (error) {
            toggleError(error);
        })        
        stopLoading();        
    };

    return (
        <div className={classes.LoginMainBlock} {...props}>
            <form name='loginForm'>
                <p>Введите имя аккаунта:</p>
                <input
                    type='username'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}/>
                <p>А теперь пароль:</p>    
                <input
                    type='password'
                    name='password'
                    value={credentials.password}                     
                    onChange={handleChange}/>
                <button type='button' onClick={handleSubmit}>Войти</button>
            </form>     
        </div>
    )
}
