import React, { useEffect, useState } from 'react'
import classes from './StartRecoveryMainBlock.module.css'
import Scrollable from '../../../Helper/Scrollable/Scrollable'
import StartRecoveryForm from '../../../Form/StartRecoveryForm/StartRecoveryForm'
import TipsCollection from '../../../Collection/TipsCollection/TipsCollection';
import { EXTRA_SHORT_DELAY, START_RECOVERY_ROUTE } from '../../../../constants';
import { validEmail, validStartRecoveryForm } from './StartRecoveryFormState';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

export default function StartRecoveryMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const [tips, setTips] = useState({}); // подсказки для пользователя

    // данные формы
    const [recoveryInfo, setRecoveryInfo] = useState({
        email: ''
    });  

    // обработка данных формы
    const handleEmailChange = (e) => {
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
    async function handleSubmit(e) {
        e.preventDefault();  
        if (!validStartRecoveryForm(setTips)) {
            return;
        }

        // основная часть
        startLoading();
        resetResult();
        await makePostRequest(
            START_RECOVERY_ROUTE, {
                email: recoveryInfo.email,
            }
        );
        stopLoading();  
    }

    return (
        <div className={classes.StartRecoveryMainBlock} {...props}>
            <Scrollable>
                <StartRecoveryForm
                    formData={recoveryInfo}
                    handleEmailChange={handleEmailChange} 
                    handleSubmit={handleSubmit} />
                <TipsCollection tips={tips}/>
            </Scrollable>            
        </div>
    )
}
