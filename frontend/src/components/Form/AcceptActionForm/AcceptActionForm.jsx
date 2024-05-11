import React from 'react'
import classes from './AcceptActionForm.module.css'
import { ACCEPT_ACTION_FORM_NAME, SHORT_DELAY } from '../../../constants'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';

export default function AcceptActionForm({handleSubmit, ...props}) {
    const { loading, toggleHolding } = useLoadingContext();    

    const handleCancel = () => {
        if (!loading) {
            toggleHolding(SHORT_DELAY);
        }
    }
    
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
