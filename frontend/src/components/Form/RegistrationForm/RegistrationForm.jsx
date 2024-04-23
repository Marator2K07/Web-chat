import React from 'react'
import classes from './RegistrationForm.module.css'
import { REGISTRATION_FORM_NAME } from '../../../constants'

export default function RegistrationForm({credentials,
                                          handleChange,
                                          handleSubmit,
                                          ...props}) {
    return (
        <div className={classes.RegistrationForm} {...props}>
            <form name={REGISTRATION_FORM_NAME}>
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
        </div>
    )
}
