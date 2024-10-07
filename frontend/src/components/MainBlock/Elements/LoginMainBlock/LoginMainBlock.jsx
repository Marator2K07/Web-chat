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
    LOGIN_ROUTE,
    RESPONSE_GOOD_STATUS,
    SHORT_DELAY
} from '../../../../constants';
import Scrollable from '../../../Helper/Scrollable/Scrollable';
import { validLoginForm } from './LoginFormState';
import LoginForm from '../../../Form/LoginForm/LoginForm';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';

export default function LoginMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();
    const navigate = useNavigate(); 

    // идентификационные данные формы
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });    

    // обработка идентификационных данных формы
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }    

    // обработка формы
    async function handleSubmit(e) {
        e.preventDefault();        
        if (!validLoginForm(shake)) {
            return;
        }
        
        // основная часть
        startLoading();
        resetResult();
        await makePostRequest(
            LOGIN_ROUTE,
            credentials,
            async (response) => {
                if (response.data.status === RESPONSE_GOOD_STATUS) {
                    setTimeout(async () => {
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
                    }, SHORT_DELAY);
                } 
            }
        );
        stopLoading();
    };

    return (
        <div className={classes.LoginMainBlock} {...props}>
            <Scrollable>
                <LoginForm 
                    formData={credentials}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit} />
            </Scrollable>                
        </div>
    )
}
