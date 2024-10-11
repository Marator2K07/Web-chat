import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs-react';
import classes from './RegisterMainBlock.module.css'
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { EXTRA_SHORT_DELAY, REGISTER_ROUTE } from '../../../../constants';
import {
    validEmail,
    validPassword,
    validPasswordAgain,
    validRegisterForm,
    validUsername
} from './RegisterFormState';
import RegistrationForm from '../../../Form/RegistrationForm/RegistrationForm';
import { useTipsContext } from '../../../../contexts/TipsContext/TipsProvider';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';

export default function RegisterMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();
    const { addTip, removeTip } = useTipsContext();

    // регистрационные данные
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

    // проверка спустя паузу корректности ввода имени аккаунта
    useEffect(() => {
        const timeout = setTimeout(() => {
            credentials.username !== "" && validUsername(addTip, removeTip);       
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [credentials.username, addTip, removeTip]);

    // проверка спустя паузу корректности ввода емайла
    useEffect(() => {
        const timeout = setTimeout(() => {
            credentials.email !== "" && validEmail(addTip, removeTip);       
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [credentials.email, addTip, removeTip])

    // проверка спустя паузу корректности ввода пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            credentials.password !== "" && validPassword(addTip, removeTip);     
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [credentials.password, addTip, removeTip])

    // проверка спустя паузу корректности ввода повтора пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            credentials.passwordAgain !== "" && validPasswordAgain(addTip, removeTip);
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [credentials.passwordAgain, addTip, removeTip])

    // обработка формы
    async function handleSubmit(e) { 
        e.preventDefault();        
        if (!validRegisterForm(shake, addTip, removeTip)) {
            return;
        }
        
        // хэшируем пароль перед отправкой
        var hashedPassword;
        await bcrypt.hash(credentials.password, 10)
        .then((response) => {
            hashedPassword = response;
        })
        .catch((error) => {
            console.log(error);
        })

        // основная часть
        startLoading();
        resetResult();
        await makePostRequest(
            REGISTER_ROUTE, {
                username: credentials.username,
                email: credentials.email,
                password: hashedPassword
            }
        );
        stopLoading();  
    };

    return (  
        <div className={classes.RegisterMainBlock} {...props}>
            <RegistrationForm
                formData={credentials}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />                          
        </div>
    )
}