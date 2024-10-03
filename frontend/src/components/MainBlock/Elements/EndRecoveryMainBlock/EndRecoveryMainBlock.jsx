import React, { useEffect, useState } from 'react'
import classes from './EndRecoveryMainBlock.module.css'
import Scrollable from '../../../Helper/Scrollable/Scrollable'
import EndRecoveryForm from '../../../Form/EndRecoveryForm/EndRecoveryForm'
import TipsCollection from '../../../Collection/TipsCollection/TipsCollection';
import { EXTRA_SHORT_DELAY } from '../../../../constants';
import {
    validEndRecoveryForm, 
    validPassword, 
    validPasswordAgain
} from './EndRecoveryFormState';

// данный основной блок является эксклюзивным и доступен
// только со страницы окончания восстановления аккаунта

export default function EndRecoveryMainBlock({...props}) {
    const [tips, setTips] = useState({}); // подсказки для пользователя

    // новые данные аккаунта для восстановления
    const [recoveredUserData, setRecoveredUserData] = useState({ 
        username: '',
        password: '',
        passwordAgain: ''           
    });

    // установка изменений в новых данных
    const handleChange = (e) => {
        setRecoveredUserData({
            ...recoveredUserData,
            [e.target.name]: e.target.value
        }); 
    }

    // проверка спустя паузу корректности ввода нового пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            recoveredUserData.password !== "" &&
                validPassword(setTips);     
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [recoveredUserData.password])

    // проверка спустя паузу корректности ввода повтора пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            recoveredUserData.passwordAgain !== "" &&
                validPasswordAgain(setTips) &&
                validPassword(setTips);                   
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [recoveredUserData.passwordAgain])

    // обработка формы
    const handleSubmit = (e) => {
        e.preventDefault();        
        if (!validEndRecoveryForm(setTips)) {
            return;
        }

    }
    
    return (
        <div className={classes.EndRecoveryMainBlock} {...props}>
            <Scrollable>
                <EndRecoveryForm
                    formData={recoveredUserData}
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} />
                <TipsCollection tips={tips} />
            </Scrollable>
        </div>
    )
}
