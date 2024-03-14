import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './UserActivationPage.module.css'
import LoadingBlock from '../../LoadingBlock/LoadingBlock'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WebChatClient from '../../../WebChatClient';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

const ApiUrl = '/user_activation';

export default function UserActivationPage({...props}) { 
    const { 
        holding,
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const { 
        resetResult,
        toggleResponse,
        toggleError
    } = useResponseHandlerContext();
    // анализ переданных параметров в url
    const [searchParams] = useSearchParams(); 
    const nodeRef = useRef(null);

    const handleActivation = async () => {
        var confirmToken = searchParams.get('key');
        // подготовка
        startLoading();
        resetResult();
        // сам запрос и его обработка
        await WebChatClient.post(ApiUrl, { confirmToken: confirmToken })
        .then(function (response) {
            toggleResponse(response);
            toggleHolding(response.data.holding, 2500); 
        })
        .catch(function (error) {
            toggleError(error);
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
                <LoadingBlock innerRef={nodeRef}/>
            </CSSTransition>
        </div>
    )
}
