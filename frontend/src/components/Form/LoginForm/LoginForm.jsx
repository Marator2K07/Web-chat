import React from 'react'
import classes from './LoginForm.module.css'

export default function LoginForm({credentials,
                                   handleChange, 
                                   handleSubmit,
                                   ...props}) {
    return (
        <div className={classes.LoginForm} {...props}>
            <form name='loginForm'>
                <h4>Введите имя аккаунта:</h4>
                <input
                    type='username'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}/>
                <h4>А теперь пароль:</h4>    
                <input
                    type='password'
                    name='password'
                    value={credentials.password}                     
                    onChange={handleChange}/>
                <button type='button' onClick={handleSubmit}>
                    Войти
                </button>
            </form>
        </div>
    )
}
