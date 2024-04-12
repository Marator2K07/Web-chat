import React, { useState } from 'react'
import classes from './LoginMainBlock.module.css'
import { useNavigate } from 'react-router-dom';
import { cookies } from '../../../../contexts/CookieContext';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import {
    AFTER_LOGIN_PAGE_URL,
    FIVE_MIN_AGE,
    LOGIN_CHECK_ROUTE,
    LOGIN_ROUTE,
    ONE_MONTH_AGE,
    SHORT_DELAY
} from '../../../../constants';
import Scrollable from '../../../Helper/Scrollable/Scrollable';
import { validLoginForm } from './LoginFormState';

export default function LoginMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const navigate = useNavigate(); 

    // идентификационные данные
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });     
    // и их обработка
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }    

    // обработка формы
    async function handleSubmit(e) {
        e.preventDefault();        
        if (!validLoginForm()) {
            return;
        }
        
        // основная часть
        startLoading();
        resetResult();
        await makePostRequest(
            LOGIN_ROUTE,
            credentials,
            async () => {
                await makePostRequest(
                    LOGIN_CHECK_ROUTE,
                    credentials,
                    (response) => {
                        const { token, refreshToken } = response.data;                 
                        cookies.set('username', credentials.username, { maxAge: ONE_MONTH_AGE });
                        cookies.set('refreshToken', refreshToken, { maxAge: ONE_MONTH_AGE });
                        cookies.set('token', token, { maxAge: FIVE_MIN_AGE });
                        setTimeout(() => {                            
                            navigate(
                                `${AFTER_LOGIN_PAGE_URL}/${credentials.username}`,
                                { replace: true }
                            ); 
                        }, SHORT_DELAY);                                               
                    }
                )                
            }
        );
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
