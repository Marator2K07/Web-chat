import React, { useEffect, useState } from 'react'
import classes from './EndRecoveryMainBlock.module.css'
import bcrypt from 'bcryptjs-react';
import Scrollable from '../../../Helper/Scrollable/Scrollable'
import EndRecoveryForm from '../../../Form/EndRecoveryForm/EndRecoveryForm'
import TipsCollection from '../../../Collection/TipsCollection/TipsCollection';
import { END_RECOVERY_ROUTE, EXTRA_SHORT_DELAY } from '../../../../constants';
import {
    validEndRecoveryForm, 
    validPassword, 
    validPasswordAgain
} from './EndRecoveryFormState';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

// данный основной блок является эксклюзивным и доступен
// только со страницы окончания восстановления аккаунта

export default function EndRecoveryMainBlock({user, ...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
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

    // в случае обновления данных о пользователе подставляем никнейм в форму
    useEffect(() => {
        if (user) {            
            setRecoveredUserData({
                username: user.username
            }); 
        }        
    }, [user])

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
    const handleSubmit = async (e) => {
        e.preventDefault();        
        if (!validEndRecoveryForm(setTips)) {
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
