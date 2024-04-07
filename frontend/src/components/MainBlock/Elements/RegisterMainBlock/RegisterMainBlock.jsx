import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs-react';
import classes from './RegisterMainBlock.module.css'
import '../../../LoadingBlock/LoadingBlockCSSTransition.css';
import {
    formEmailIsCorrect,
    formParamIsSmall,
    passwordIsRepeated
} from '../../../../utils';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { REGISTER_URL } from '../../../../constants';
import Scrollable from '../../../Scrollable/Scrollable';
import TipsCollection from '../../../Collection/TipsCollection/TipsCollection';
import { checkRegisterForm } from './RegisterFormState';

export default function RegisterMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const [tips, setTips] = useState({}); // подсказки для пользователя
    const [validated, setValidated] = useState(false); // состояние предпроверки 

    // идентификационные данные
    const [credentials, setCredentials] = useState({ 
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
    }, [credentials.passwordAgain, credentials.password]);

    // установка изменений в идентификационных данных
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        }); 
    }

    // обработка формы
    async function handleSubmit(e) { 
        e.preventDefault();        
        // предпроверка перед отправкой запроса
        let validatedFinal = checkRegisterForm() && validated;
        if (!validatedFinal) {
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
            REGISTER_URL, {
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
                <form name='registerForm'>
                    <h4>Придумайте имя аккаунта:</h4>
                    <input
                        type='username'
                        name='username'
                        value={credentials.username}
                        onChange={handleChange}/>
                    <h4>Задайте почту для привязки:</h4>
                    <input
                        type='email'
                        name='email'
                        value={credentials.email} 
                        onChange={handleChange}/>
                    <h4>А теперь придумайте пароль:</h4>
                    <input
                        type='password'
                        name='password'
                        value={credentials.password} 
                        onChange={handleChange}/>
                    <h4>И повторите его:</h4>
                    <input
                        type='password'
                        name='passwordAgain'
                        value={credentials.passwordAgain} 
                        onChange={handleChange}/>
                    <button type='button' onClick={handleSubmit}>Зарегистрироваться</button>
                </form>  
                <TipsCollection tips={tips}/>  
            </Scrollable>                               
        </div>
    )
}