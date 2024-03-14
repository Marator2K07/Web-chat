import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './UserActivationPage.module.css'
import LoadingBlock from '../../LoadingBlock/LoadingBlock'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WebChatClient from '../../../WebChatClient';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingContextProvider';

const ApiUrl = '/user_activation';

export default function UserActivationPage({...props}) { 
    const { holding,
            startLoading,
            stopLoading, 
            toggleHolding } = useLoadingContext();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    // анализ переданных параметров в url
    const [searchParams] = useSearchParams(); 
    const nodeRef = useRef(null); // для анимации загрузки

    const handleActivation = async () => {
        var confirmToken = searchParams.get('key');

        // подготовка
        startLoading();
        setResponse(null);
        setError(null);

        // сам запрос и его обработка
        await WebChatClient.post(ApiUrl, { confirmToken: confirmToken })
        .then(function (response) {
            setResponse(response);
            toggleHolding(response.data.holding, 2500); 
        })
        .catch(function (error) {
            setError(error);
        });
        stopLoading();
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
                    error={error}  
                    response={response}/>
            </CSSTransition>
        </div>
    )
}
