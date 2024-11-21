import React, { useEffect, useState } from 'react'
import classes from './EndRecoveryMainBlock.module.css';
import EndRecoveryForm from '../../../Form/EndRecoveryForm/EndRecoveryForm';
import { END_RECOVERY_ROUTE } from '../../../../constants';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';

// данный основной блок является отдельным и доступен
// только со страницы окончания восстановления аккаунта

export default function EndRecoveryMainBlock({ user, ...props }) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();

    const [validationErrors, setValidationErrors] = useState([]);
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

    // в случае обновления данных о пользователе подставляем никнейм в форму
    useEffect(() => {
        if (user) {
            setRecoveredUserData({
                ...recoveredUserData,
                username: user.username
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [user]);

    // обработка формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading();
        resetResult();
        // основная часть 
        if (!user) {
            window.close();
        } else {
            await makePostRequest(
                END_RECOVERY_ROUTE, {
                    id: user.id,
                    username: recoveredUserData.username,
                    password: recoveredUserData.password,
                    passwordAgain: recoveredUserData.passwordAgain
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
    }

    return (
        <div className={classes.EndRecoveryMainBlock} {...props}>
            <EndRecoveryForm
                formData={recoveredUserData}
                errorsData={validationErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
