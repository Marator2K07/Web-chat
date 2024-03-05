import React, { useState } from 'react'
import axios from 'axios'
import classes from './LoginMainBlock.module.css'
import ResponseErrorBlock from '../../../Messages/ResponseError/ResponseError'

const ApiUrl = 'http://127.0.0.1:8000/login';

export default function LoginMainBlock({user, ...props}) {
    const [error, setError] = useState(null);
    // идентификационные данные
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: ''    
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
        await axios.post(ApiUrl, credentials)
        .then(function (response) {
            // обрабатываем JWT токены
            const { token, refreshToken } = response.data;
            // сохранение в локальное хранилище не безопасно, но пока так 
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            console.log(response.data);
        })
        .catch(function (error) {
            setError(error);
        })
    };

    return (
        <div className={classes.LoginMainBlock} {...props}>
            <form>
                <input
                    type='username'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder='Имя аккаунта'/>
                <input
                    type='email'
                    name='email'
                    value={credentials.email} 
                    onChange={handleChange} 
                    placeholder='Почта аккаунта'/>
                <input
                    type='password'
                    name='password'
                    value={credentials.password} 
                    onChange={handleChange} 
                    placeholder='Пароль от аккаунта'/>
                <button type='button' onClick={handleSubmit}>Войти в аккаунт</button>
            </form>
            {error === null ? '' : <ResponseErrorBlock responseError={error}/>}            
        </div>
    )
}
