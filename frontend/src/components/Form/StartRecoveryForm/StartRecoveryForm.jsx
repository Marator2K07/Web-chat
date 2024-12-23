import React, { useRef } from 'react'
import classes from './StartRecoveryForm.module.css'
import { START_RECOVERY_FORM_NAME } from '../../../constants'
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';
import TipsCollection from '../../Collection/TipsCollection/TipsCollection';

export default function StartRecoveryForm({
    formData,
    errorsData,
    handleEmailChange,
    handleSubmit,
    ...props
}) {
    const inputEmailRef = useRef(null);
    const { newTipsCoordinates, resetState } = useTipsContext();

    return (
        <div
            className={classes.StartRecoveryForm}
            onBlur={resetState}
            {...props}
        >
            <form name={START_RECOVERY_FORM_NAME}>
                <h4>Почта, привязанная к аккаунту:</h4>
                <input
                    ref={inputEmailRef}
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleEmailChange}
                    onFocus={() => newTipsCoordinates(inputEmailRef)}
                />
                {
                    errorsData &&
                    errorsData['email'] &&
                    <TipsCollection tips={errorsData['email']} />
                }                

                <p>Важное замечание: восстановление работает
                    только с активированными аккаунтами.</p>
                <button type='button' onClick={handleSubmit}>
                    Восстановить
                </button>
            </form>
        </div>
    )
}
