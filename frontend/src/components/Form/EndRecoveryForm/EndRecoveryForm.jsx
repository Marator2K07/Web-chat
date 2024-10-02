import React from 'react'
import classes from './EndRecoveryForm.module.css'
import { END_RECOVERY_FORM_NAME } from '../../../constants'

export default function EndRecoveryForm({formData,
                                         handleChange,
                                         handleSubmit,
                                         ...props}) {
    return (
        <div className={classes.EndRecoveryForm} {...props}>
            <form name={END_RECOVERY_FORM_NAME}>
                <h4>Новое имя аккаунта:</h4>
                <input
                    type='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}/>
                <h4>Введите новый пароль:</h4>
                <input
                    type='password'
                    name='password'
                    value={formData.password} 
                    onChange={handleChange}/>
                <h4>И повторите его:</h4>
                <input
                    type='password'
                    name='passwordAgain'
                    value={formData.passwordAgain} 
                    onChange={handleChange}/>
                <button type='button' onClick={handleSubmit}>
                    Применить
                </button>
            </form>
        </div>
    )
}
