import React, { useState } from 'react'
import classes from './StartRecoveryMainBlock.module.css';
import { START_RECOVERY_ROUTE } from '../../../../constants';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import StartRecoveryForm from '../../../Form/StartRecoveryForm/StartRecoveryForm';

export default function StartRecoveryMainBlock({ ...props }) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();

    const [validationErrors, setValidationErrors] = useState([]);
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

    // обработка формы
    async function handleSubmit(e) {
        e.preventDefault();
        startLoading();
        resetResult();
        await makePostRequest(
            START_RECOVERY_ROUTE, {
                email: recoveryInfo.email,
            },
            async (response) => {
                setValidationErrors(response.data.validationErrors);
                if (response.data.validationErrors) {
                    shake();
                }
            }
        );

        stopLoading();
    }

    return (
        <div className={classes.StartRecoveryMainBlock} {...props}>
            <StartRecoveryForm
                formData={recoveryInfo}
                errorsData={validationErrors}
                handleEmailChange={handleEmailChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
