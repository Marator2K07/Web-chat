import React from 'react'
import classes from './LoginForm.module.css'
import { LOGIN_FORM_NAME } from '../../../constants';
import TipsCollection from '../../Collection/TipsCollection/TipsCollection';

export default function LoginForm({
    formData,
    errorsData,
    handleChange,
    handleSubmit,
    ...props
}) {
    return (
        <div className={classes.LoginForm} {...props}>
            <form name={LOGIN_FORM_NAME}>
                <h4>Введите имя аккаунта:</h4>
                <input
                    type='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                />
                {
                    errorsData &&
                    errorsData['username'] &&
                    <TipsCollection tips={errorsData['username']} />
                }

                <h4>А теперь пароль:</h4>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                />
                {
                    errorsData &&
                    errorsData['password'] &&
                    <TipsCollection tips={errorsData['password']} />
                }

                <button type='button' onClick={handleSubmit}>
                    Войти
                </button>
            </form>
        </div>
    );
}
