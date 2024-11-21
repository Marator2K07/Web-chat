import React, { useEffect, useRef } from 'react'
import classes from './EndRecoveryForm.module.css'
import { END_RECOVERY_FORM_NAME } from '../../../constants'
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';
import TipsCollection from '../../Collection/TipsCollection/TipsCollection';

export default function EndRecoveryForm({
    formData,
    errorsData,
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
                {
                    errorsData &&
                    errorsData['username'] &&
                    <TipsCollection tips={errorsData['username']} />
                }

                <h4>Введите новый пароль:</h4>
                <input
                    ref={inputPasswordRef}
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputPasswordRef)}
                />
                {
                    errorsData &&
                    errorsData['password'] &&
                    <TipsCollection tips={errorsData['password']} />
                }

                <h4>И повторите его:</h4>
                <input
                    ref={inputPasswordAgainRef}
                    type='password'
                    name='passwordAgain'
                    value={formData.passwordAgain}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputPasswordAgainRef)}
                />
                {
                    errorsData &&
                    errorsData['passwordAgain'] &&
                    <TipsCollection tips={errorsData['passwordAgain']} />
                }

                <button type='button' onClick={handleSubmit}>
                    Применить
                </button>
            </form>
        </div>
    )
}
