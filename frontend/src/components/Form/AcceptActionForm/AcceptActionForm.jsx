import React from 'react'
import classes from './AcceptActionForm.module.css'
import { ACCEPT_ACTION_FORM_NAME } from '../../../constants'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout'

export default function AcceptActionForm({handleSubmit,
                                          handleCancel,
                                          ...props}) {
    return (
        <div className={classes.AcceptActionForm} {...props}>
            <form name={ACCEPT_ACTION_FORM_NAME}>
                <p>Подтверждение выполнения операции</p>
                <HorizontalLayout>
                    <button type='button' onClick={handleSubmit}>
                        Подтвердить
                    </button>
                    <button type='button' onClick={handleCancel}>
                        Отмена
                    </button>
                </HorizontalLayout> 
            </form>
        </div>
    )
}
