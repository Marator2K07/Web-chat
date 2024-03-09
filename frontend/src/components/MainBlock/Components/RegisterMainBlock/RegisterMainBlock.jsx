import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './RegisterMainBlock.module.css'
import '../../../LoadingBlock/LoadingBlockCSSTransition.css';
import { formEmailIsCorrect,
         formParamIsEmpty,
         formParamIsSmall,
         passwordIsRepeated } from '../../../../utils';
import Clue from '../../Minor/Clue/Clue';

const ApiUrl = 'http://127.0.0.1:8000/register';

export default function RegisterMainBlock({user,
                                           setLoading,
                                           setResponce,
                                           setError,
                                           ...props}) {
    // подсказки для пользователя
    const [tips, setTips] = useState({});  
    // состояние предпроверки
    const [validated, setValidated] = useState(false);                                           
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
        
        // если прошли предпроверку
        setLoading(true);
        setResponce(null);
        setError(null);
        await axios.post(ApiUrl, credentials)        
        .then(function (responce) {
            setResponce(responce);            
        })
        .catch(function (error) {
            setError(error);
        })
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