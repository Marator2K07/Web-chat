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
import LoginForm from '../../../Form/LoginForm/LoginForm';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';

export default function LoginMainBlock({ ...props }) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState([]);
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
        startLoading();
        resetResult();
        // основная часть
        await makePostRequest(
            LOGIN_ROUTE,
            credentials,
            async (response) => {
                setValidationErrors(response.data.validationErrors);
                if (response.data.validationErrors) {
                    shake();
                } else if (response.data.status === RESPONSE_GOOD_STATUS) {
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
            <LoginForm
                formData={credentials}
                errorsData={validationErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
