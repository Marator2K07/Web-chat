import React from 'react'
import classes from './RegistrationForm.module.css'

export default function RegistrationForm({credentials,
                                          handleChange,
                                          handleSubmit,
                                          ...props}) {
    return (
        <div className={classes.RegistrationForm} {...props}>
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
        </div>
    )
}
