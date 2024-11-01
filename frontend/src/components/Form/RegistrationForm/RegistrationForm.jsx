import React, { useRef } from 'react'
import classes from './RegistrationForm.module.css'
import { REGISTRATION_FORM_NAME } from '../../../constants'
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';

export default function RegistrationForm({
    formData,
    handleChange,
    handleSubmit,
    ...props
}) {
    const inputUsernameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const inputPasswordAgainRef = useRef(null);
    const { newTipsCoordinates, resetState } = useTipsContext();

    return (
        <div
            className={classes.RegistrationForm}
            onBlur={resetState}
            {...props}
        >
            <form name={REGISTRATION_FORM_NAME}>
                <h4>Придумайте имя аккаунта:</h4>
                <input
                    ref={inputUsernameRef}
                    type='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputUsernameRef)}
                />

                <h4>Задайте почту для привязки:</h4>
                <input
                    ref={inputEmailRef}
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputEmailRef)}
                />

                <h4>А теперь придумайте пароль:</h4>
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
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}
