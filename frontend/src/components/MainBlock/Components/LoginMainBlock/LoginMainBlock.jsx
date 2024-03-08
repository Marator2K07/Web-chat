import React, { useState } from 'react'
import axios from 'axios'
import classes from './LoginMainBlock.module.css'
import { formParamIsEmpty } from '../../../../utils';

const ApiUrl = 'http://127.0.0.1:8000/login';

export default function LoginMainBlock({user,
                                        setLoading,
                                        setResponce,
                                        setError,
                                        ...props}) {
    // идентификационные данные
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });    
    // состояние предпроверки
    const [validated, setValidated] = useState(false);    

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
        let usernameOk = !formParamIsEmpty('loginForm', 'username');
        let passwordOk = !formParamIsEmpty('loginForm', 'password');        
        setValidated(usernameOk && passwordOk);    
        if (!validated) {            
            return;
        }
        
        // если прошли предпроверку
        setLoading(true);
        setResponce(null);
        setError(null);
        await axios.post(ApiUrl, credentials)
        .then(function (response) {
            // обрабатываем JWT токены (тестовый код)
            const { token, refreshToken } = response.data;
            // сохранение в локальное хранилище не безопасно, но пока так 
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            setResponce(response);
            console.log(response.data);
        })
        .catch(function (error) {
            setError(error);
        })
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
