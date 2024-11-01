import React, { useEffect, useRef } from 'react'
import classes from './EndRecoveryForm.module.css'
import { END_RECOVERY_FORM_NAME } from '../../../constants'
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';

export default function EndRecoveryForm({
    formData,
    handleChange,
    handleSubmit,
    ...props
}) {
    const inputUsernameRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const inputPasswordAgainRef = useRef(null);
    const { newTipsCoordinates, resetState } = useTipsContext();

    useEffect(() => {
        if (inputUsernameRef.current) {
            inputUsernameRef.current.focus();
        }
    }, []);

    return (
        <div
            className={classes.EndRecoveryForm}
            onBlur={resetState}
            {...props}
        >
            <form name={END_RECOVERY_FORM_NAME}>
                <h4>Новое имя аккаунта:</h4>
                <input
                    ref={inputUsernameRef}
                    type='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputUsernameRef)}
                />

                <h4>Введите новый пароль:</h4>
                <input
                    ref={inputPasswordRef}
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputPasswordRef)}
                />

                <h4>И повторите его:</h4>
                <input
                    ref={inputPasswordAgainRef}
                    type='password'
                    name='passwordAgain'
                    value={formData.passwordAgain}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputPasswordAgainRef)}
                />
                <button type='button' onClick={handleSubmit}>
                    Применить
                </button>
            </form>
        </div>
    )
}
