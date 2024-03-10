import React, { useState } from 'react'
import axios from 'axios'
import classes from './LoginMainBlock.module.css'
import { formParamIsEmpty } from '../../../../utils';

const ApiUrl = 'http://127.0.0.1:8000/login';

export default function LoginMainBlock({user,
                                        setLoading,
                                        setResponse,
                                        setError,
                                        setHolding,
                                        ...props}) {
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
        // отправка запроса и управление
        await axios.post(ApiUrl, credentials)
        .then(function (response) {
            // обрабатываем JWT токены (тестовый код)
            const { token, refreshToken } = response.data;
            // сохранение в локальное хранилище не безопасно, но пока так 
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);

            // ---- console.log(response); ---- //
            setResponse(response);
            // если не было команды оставить сообщение, то оно
            // автоматически исчезнет через 2.5 секунды                                    
            if (!response.data.hasOwnProperty("holding")) {
                setTimeout(() => {
                    setHolding(false);
                }, 2500);
            }                           
        })
        .catch(function (error) {
            // ---- console.log(error); ---- //
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
