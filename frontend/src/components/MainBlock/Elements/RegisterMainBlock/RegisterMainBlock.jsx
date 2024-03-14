import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs-react';
import classes from './RegisterMainBlock.module.css'
import '../../../LoadingBlock/LoadingBlockCSSTransition.css';
import { formEmailIsCorrect,
         formParamIsEmpty,
         formParamIsSmall,
         passwordIsRepeated } from '../../../../utils';
import Clue from '../../../Tips/Clue/Clue';
import WebChatClient from '../../../../WebChatClient';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

const registerUrl = '/register';

export default function RegisterMainBlock({...props}) {
    const { 
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const { 
        resetResult,
        toggleResponse,
        toggleError
    } = useResponseHandlerContext();
    const [tips, setTips] = useState({}); // подсказки для пользователя
    const [validated, setValidated] = useState(false); // состояние предпроверки 
    const [credentials, setCredentials] = useState({ // идентификационные данные
        username: '',
        email: '', 
        password: '',
        passwordAgain: ''           
    });

    // анализ ввода строки почты пользователя
    useEffect(() => {        
        if (credentials.email !== '' &&
            !formEmailIsCorrect('registerForm', 'email',
                                'Неверный формат почты', setTips)) {
            setValidated(false);
        } else {
            setValidated(true);
        }
    }, [credentials.email]);

    // анализ ввода строки пароля пользователя
    useEffect(() => {        
        if (credentials.password !== '' &&
            !formParamIsSmall('registerForm', 'password',
                              'Пароль слишком короткий', setTips)) {
            setValidated(false);
        } else {
            setValidated(true);
        }
    }, [credentials.password]);

    // анализ ввода строки подтверждения пароля пользователя
    useEffect(() => {        
        if (credentials.passwordAgain !== '' &&
            !passwordIsRepeated('registerForm', 'password', 'passwordAgain', 
                                'Пароли не совпадают', setTips)) {
            setValidated(false);
        } else {
            setValidated(true);
        }     
    }, [
        credentials.passwordAgain,
        credentials.password
    ]);

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
        let validatedFinal = true;
        let usernameOk = !formParamIsEmpty('registerForm', 'username');
        let emailOk = !formParamIsEmpty('registerForm', 'email');
        let passwordOk = !formParamIsEmpty('registerForm', 'password');
        let passwordAgainOk = !formParamIsEmpty('registerForm', 'passwordAgain');
        validatedFinal = (usernameOk && emailOk &&
                          passwordOk && passwordAgainOk && 
                          validated && validatedFinal);
        if (!validatedFinal) {
            return;
        }
        
        // подготовка
        startLoading();
        resetResult();

        // хэшируем пароль перед отправкой
        var hashedPassword;
        await bcrypt.hash(credentials.password, 10)
        .then((response) => {
            hashedPassword = response;
        })
        .catch((error) => {
            console.log(error);
        })

        // отправка запроса и управление
        await WebChatClient.post(registerUrl, {
            username: credentials.username,
            email: credentials.email,
            password: hashedPassword
        })        
        .then(function (response) {
            toggleResponse(response);  
            if (!response.data.hasOwnProperty("holding")) {
                toggleHolding(response.data.holding, 2500);
            }        
        })
        .catch(function (error) {
            toggleError(error);
        })
        stopLoading();        
    };

    return (  
        <div className={classes.RegisterMainBlock} {...props}>
            <form name='registerForm'>
                <p>Придумайте имя аккаунта:</p>
                <input
                    type='username'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}/>
                <p>Задайте почту для привязки:</p>
                <input
                    type='email'
                    name='email'
                    value={credentials.email} 
                    onChange={handleChange}/>
                <p>А теперь придумайте пароль:</p>
                <input
                    type='password'
                    name='password'
                    value={credentials.password} 
                    onChange={handleChange}/>
                <p>И повторите его:</p>
                <input
                    type='password'
                    name='passwordAgain'
                    value={credentials.passwordAgain} 
                    onChange={handleChange}/>
                <button type='button' onClick={handleSubmit}>Зарегистрироваться</button>
            </form>  
            <Clue tips={tips}/>                     
        </div>
    )
}