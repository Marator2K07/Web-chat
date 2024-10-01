import React, { useEffect, useState } from 'react'
import classes from './StartRecoveryMainBlock.module.css'
import Scrollable from '../../../Helper/Scrollable/Scrollable'
import StartRecoveryForm from '../../../Form/StartRecoveryForm/StartRecoveryForm'
import TipsCollection from '../../../Collection/TipsCollection/TipsCollection';
import { EXTRA_SHORT_DELAY } from '../../../../constants';
import { validEmail } from './StartRecoveryFormState';

export default function StartRecoveryMainBlock({...props}) {
    const [tips, setTips] = useState({}); // подсказки для пользователя

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

    // проверка спустя паузу корректности ввода емайла
    useEffect(() => {
        const timeout = setTimeout(() => {
            recoveryInfo.email !== "" && validEmail(setTips);       
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [recoveryInfo.email])

    // обработка формы
    async function handleSubmit(params) {
        
    }

    return (
        <div className={classes.StartRecoveryMainBlock} {...props}>
            <Scrollable>
                <StartRecoveryForm
                    formData={recoveryInfo}
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} />
                <TipsCollection tips={tips}/>
            </Scrollable>            
        </div>
    )
}
