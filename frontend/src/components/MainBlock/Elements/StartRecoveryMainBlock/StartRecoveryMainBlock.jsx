import React, { useState } from 'react'
import classes from './StartRecoveryMainBlock.module.css'
import Scrollable from '../../../Helper/Scrollable/Scrollable'
import StartRecoveryForm from '../../../Form/StartRecoveryForm/StartRecoveryForm'

export default function StartRecoveryMainBlock({...props}) {
    // данные формы
    const [recoveryInfo, setRecoveryInfo] = useState({
        email: ''
    });  

    // обработка данных формы
    const handleChange = (e) => {
        setRecoveryInfo({
            ...recoveryInfo,
            [e.target.name]: e.target.value
        });
    }  

    return (
        <div className={classes.StartRecoveryMainBlock} {...props}>
            <Scrollable>
                <StartRecoveryForm
                    formData={recoveryInfo}
                    handleChange={handleChange} />

            </Scrollable>            
        </div>
    )
}
