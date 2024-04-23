import React, { useState } from 'react'
import classes from './LoginMainBlock.module.css'
import { useNavigate } from 'react-router-dom';
import { setUserCookies } from '../../../../contexts/CookieContext';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import {
    AFTER_LOGIN_PAGE_URL,
    EXTRA_SHORT_DELAY,
    LOGIN_CHECK_ROUTE,
    LOGIN_ROUTE
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
                stopLoading(); 
                await makePostRequest(
                    LOGIN_CHECK_ROUTE,
                    credentials,
                    (response) => {
                        const { token, refreshToken } = response.data;                 
                        setUserCookies(credentials.username, token, refreshToken); 
                        setTimeout(() => {
                            navigate(
                                `${AFTER_LOGIN_PAGE_URL}/${credentials.username}`,
                                { replace: true }
                            );   
                            resetResult();    
                        }, EXTRA_SHORT_DELAY);                                                                                         
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
                    <button type='button' onClick={handleSubmit}>
                        Войти
                    </button>
                </form> 
            </Scrollable>                
        </div>
    )
}
