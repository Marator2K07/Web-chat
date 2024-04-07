import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs-react';
import classes from './RegisterMainBlock.module.css'
import '../../../LoadingBlock/LoadingBlockCSSTransition.css';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { EXTRA_SHORT_DELAY, REGISTER_URL } from '../../../../constants';
import Scrollable from '../../../Scrollable/Scrollable';
import TipsCollection from '../../../Collection/TipsCollection/TipsCollection';
import {
    validEmail,
    validPassword,
    validPasswordAgain,
    validRegisterForm
} from './RegisterFormState';

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
                    <button type='button' onClick={handleSubmit}>
                        Зарегистрироваться
                    </button>
                </form>  
                <TipsCollection tips={tips}/>  
            </Scrollable>                               
        </div>
    )
}