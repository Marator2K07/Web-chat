import React, { useState } from 'react'
import classes from './LoginMainBlock.module.css'
import { formParamIsEmpty } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import WebChatClient from '../../../../WebChatClient';
import { cookies } from '../../../../contexts/CookieContext';

const loginUrl = '/login';
const getTokensUrl = '/api/login_check';

export default function LoginMainBlock({user,
                                        setLoading,
                                        setResponse,
                                        setError,
                                        setHolding,
                                        ...props}) {
    // отдельно используем веб-хук для навигации
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
        setLoading(true);
        setHolding(true);
        setResponse(null);
        setError(null);

        // внешний запрос для проверки идентификационных данных
        await WebChatClient.post(loginUrl, credentials)
        .then(async function (response) {         
            setResponse(response);
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
                    setError(error);
                })
            }   
            // если не было команды оставить сообщение, то оно
            // автоматически исчезнет через 2.5 секунды 
            if (!response.data.hasOwnProperty("holding")) {
                setTimeout(() => {
                    setHolding(false);
                    // если вошли успешно в аккаунт 
                    if (response.data.hasOwnProperty("link")) {
                        navigate(response.data.link, { replace: true });
                    }
                }, 2500);
            }                           
        })
        .catch(function (error) {
            setError(error);
        })        
        setLoading(false);        
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
