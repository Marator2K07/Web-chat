import React, { useEffect, useState } from 'react'
import classes from './StartRecoveryMainBlock.module.css';
import StartRecoveryForm from '../../../Form/StartRecoveryForm/StartRecoveryForm';
import { EXTRA_SHORT_DELAY, START_RECOVERY_ROUTE } from '../../../../constants';
import { validEmail, validStartRecoveryForm } from './StartRecoveryFormState';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { useTipsContext } from '../../../../contexts/TipsContext/TipsProvider';

export default function StartRecoveryMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();
    const { addTip, removeTip } = useTipsContext();

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
            recoveryInfo.email !== "" && validEmail(addTip, removeTip);       
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [recoveryInfo.email, addTip, removeTip])

    // обработка формы
    async function handleSubmit(e) {
        e.preventDefault();  
        if (!validStartRecoveryForm(shake, addTip, removeTip)) {
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
            <StartRecoveryForm
                formData={recoveryInfo}
                handleEmailChange={handleEmailChange} 
                handleSubmit={handleSubmit} />        
        </div>
    )
}
