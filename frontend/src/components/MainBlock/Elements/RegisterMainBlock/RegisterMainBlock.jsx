import React, { useState } from 'react'
import classes from './RegisterMainBlock.module.css'
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { REGISTER_ROUTE } from '../../../../constants';
import RegistrationForm from '../../../Form/RegistrationForm/RegistrationForm';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';

export default function RegisterMainBlock({ ...props }) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();

    const [validationErrors, setValidationErrors] = useState([]);
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        passwordAgain: ''
    });

    // установка изменений в регистрационных данных
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
            REGISTER_ROUTE, {
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                passwordAgain: credentials.passwordAgain
            },
            async (response) => {
                setValidationErrors(response.data.validationErrors);
                if (response.data.validationErrors) {
                    shake();
                }
            }
        );

        stopLoading();
    };

    return (
        <div className={classes.RegisterMainBlock} {...props}>
            <RegistrationForm
                formData={credentials}
                errorsData={validationErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}