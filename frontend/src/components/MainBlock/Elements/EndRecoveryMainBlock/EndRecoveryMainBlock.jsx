import React, { useState } from 'react'
import classes from './EndRecoveryMainBlock.module.css'
import Scrollable from '../../../Helper/Scrollable/Scrollable'
import EndRecoveryForm from '../../../Form/EndRecoveryForm/EndRecoveryForm'

// данный основной блок является эксклюзивным и доступен
// только со страницы окончания восстановления аккаунта

export default function EndRecoveryMainBlock({...props}) {
    
    // новые данные аккаунта для восстановления
    const [recoveredUserData, setRecoveredUserData] = useState({ 
        username: '',
        password: '',
        passwordAgain: ''           
    });
    
    return (
        <div className={classes.EndRecoveryMainBlock} {...props}>
            <Scrollable>
                <EndRecoveryForm
                    formData={recoveredUserData} />
            </Scrollable>
        </div>
    )
}
