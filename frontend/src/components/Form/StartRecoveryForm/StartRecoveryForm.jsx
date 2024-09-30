import React from 'react'
import classes from './StartRecoveryForm.module.css'
import { START_RECOVERY_FORM_NAME } from '../../../constants'

export default function StartRecoveryForm({formData,
                                           handleChange,
                                           handleSubmit,
                                           ...props}) {
    return (
        <div className={classes.StartRecoveryForm} {...props}> 
            <form name={START_RECOVERY_FORM_NAME}>
                <h4>Почта, привязанная к аккаунту:</h4>
                <input
                    type='email'
                    name='email'
                    value={formData.email} 
                    onChange={handleChange}
                />
                <p>Важное замечание: восстановление работает только с активированными аккаунтами
                    (пользователь хоть раз заходил в свой профиль).</p>
                <button type='button' onClick={handleSubmit}>
                    Восстановить 
                </button>
            </form>
        </div>
    )
}
