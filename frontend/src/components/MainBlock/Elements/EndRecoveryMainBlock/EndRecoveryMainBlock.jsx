import React, { useEffect, useState } from 'react'
import classes from './EndRecoveryMainBlock.module.css'
import bcrypt from 'bcryptjs-react';
import EndRecoveryForm from '../../../Form/EndRecoveryForm/EndRecoveryForm';
import { END_RECOVERY_ROUTE, EXTRA_SHORT_DELAY } from '../../../../constants';
import {
    validEndRecoveryForm,
    validPassword,
    validPasswordAgain,
    validUsername
} from './EndRecoveryFormState';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { useTipsContext } from '../../../../contexts/TipsContext/TipsProvider';

// данный основной блок является отдельным и доступен
// только со страницы окончания восстановления аккаунта

export default function EndRecoveryMainBlock({ user, ...props }) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();
    const { addTip, removeTip } = useTipsContext();

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

    // проверка спустя паузу корректности ввода нового никнейма
    useEffect(() => {
        const timeout = setTimeout(() => {
            recoveredUserData.username !== "" &&
                validUsername(addTip, removeTip);
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [recoveredUserData.username, addTip, removeTip])

    // проверка спустя паузу корректности ввода нового пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            recoveredUserData.password !== "" &&
                validPassword(addTip, removeTip);
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [recoveredUserData.password, addTip, removeTip])

    // проверка спустя паузу корректности ввода повтора пароля
    useEffect(() => {
        const timeout = setTimeout(() => {
            recoveredUserData.passwordAgain !== "" &&
                validPasswordAgain(addTip, removeTip);
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [recoveredUserData.passwordAgain, addTip, removeTip])

    // обработка формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validEndRecoveryForm(shake, addTip, removeTip)) {
            return;
        }
        // хэшируем новый пароль перед отправкой
        let hashedPassword;
        await bcrypt.hash(recoveredUserData.password, 10)
            .then((response) => {
                hashedPassword = response;
            })
            .catch((error) => {
                console.log(error);
            })
        // основная часть 
        if (!user) {
            window.close();
        } else {
            startLoading();
            resetResult();
            await makePostRequest(
                END_RECOVERY_ROUTE, {
                id: user.id,
                username: recoveredUserData.username,
                password: hashedPassword
            }
            );

            stopLoading();
        }
    }

    return (
        <div className={classes.EndRecoveryMainBlock} {...props}>
            <EndRecoveryForm
                formData={recoveredUserData}
                handleChange={handleChange}
                handleSubmit={handleSubmit} 
            />
        </div>
    )
}
