import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs-react';
import classes from './RegisterMainBlock.module.css'
import '../../../LoadingBlock/LoadingBlockCSSTransition.css';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { EXTRA_SHORT_DELAY, REGISTER_ROUTE } from '../../../../constants';
import Scrollable from '../../../Helper/Scrollable/Scrollable';
import TipsCollection from '../../../Collection/TipsCollection/TipsCollection';
import {
    validEmail,
    validPassword,
    validPasswordAgain,
    validRegisterForm
} from './RegisterFormState';
import RegistrationForm from '../../../Form/RegistrationForm/RegistrationForm';

export default function RegisterMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const [tips, setTips] = useState({}); // подсказки для пользователя

    // идентификационные данные
    const [credentials, setCredentials] = useState({ 
        username: '',
        email: '', 
        password: '',
        passwordAgain: ''           
    });

    // установка изменений в идентификационных данных
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        }); 
    }

    // проверка спустя паузу корректности ввода емайла
    useEffect(() => {
        const timeout = setTimeout(() => {
            credentials.email !== "" && validEmail(setTips);       
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [credentials.email])

    // проверка спустя паузу корректности ввода пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            credentials.password !== "" && validPassword(setTips);     
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [credentials.password])

    // проверка спустя паузу корректности ввода повтора пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            credentials.passwordAgain !== "" &&
                validPasswordAgain(setTips) &&
                validPassword(setTips);                   
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [credentials.passwordAgain])

    // обработка формы
    async function handleSubmit(e) { 
        e.preventDefault();        
        if (!validRegisterForm(setTips)) {
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
            <Scrollable>
                <RegistrationForm
                    formData={credentials}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit} />
                <TipsCollection tips={tips}/>  
            </Scrollable>                               
        </div>
    )
}