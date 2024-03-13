import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './UserActivationPage.module.css'
import LoadingBlock from '../../LoadingBlock/LoadingBlock'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WebChatClient from '../../../WebChatClient';

const ApiUrl = '/user_activation';

export default function UserActivationPage({...props}) { 
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);      
    const [holding, setHolding] = useState(false);
    const [loading, setLoading] = useState(false); 
    // анализ переданных параметров в url
    const [searchParams] = useSearchParams(); 
    const nodeRef = useRef(null); // для анимации загрузки

    const handleActivation = async () => {
        var confirmToken = searchParams.get('key');

        // подготовка
        setLoading(true);
        setHolding(true);
        setResponse(null);
        setError(null);

        // сам запрос и его обработка
        await WebChatClient.post(ApiUrl, { confirmToken: confirmToken })
        .then(function (response) {
            setResponse(response);
            // если не было команды оставить сообщение, то оно
            // автоматически исчезнет через 2.5 секунды                                    
            if (!response.data.hasOwnProperty("holding")) {
                setTimeout(() => {
                    setHolding(false);
                }, 2500);
            } 
        })
        .catch(function (error) {
            setError(error);
        });
        setLoading(false);
    }

    // вызов активации при запуске страницы
    useEffect(() => {        
        handleActivation(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.UserActivationPage} {...props}>
            <h3>Активация аккаунта</h3>    
            <CSSTransition 
                in={holding}
                nodeRef={nodeRef}
                timeout={333}
                classNames="LoadingBlock">
                <LoadingBlock 
                    innerRef={nodeRef}
                    loading={loading}
                    holding={holding}
                    setHolding={setHolding}
                    error={error}  
                    response={response}/>
            </CSSTransition>
        </div>
    )
}
