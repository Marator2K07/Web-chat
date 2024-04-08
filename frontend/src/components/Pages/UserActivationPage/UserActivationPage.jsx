import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './UserActivationPage.module.css'
import LoadingBlock from '../../LoadingBlock/LoadingBlock'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { LONG_DELAY, SHORT_TIMEOUT, USER_ACTIVATION_ROUTE } from '../../../constants';

export default function UserActivationPage({...props}) { 
    const { 
        holding,
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();    
    const [searchParams] = useSearchParams(); // анализ переданных параметров в url
    const nodeRef = useRef(null);

    // обработка активации
    const handleActivation = async () => {
        let confirmToken = searchParams.get('key');
        startLoading();
        resetResult();
        makePostRequest(
            USER_ACTIVATION_ROUTE,
            { confirmToken: confirmToken },
            toggleHolding(false, LONG_DELAY),
            toggleHolding(false, LONG_DELAY)
        );
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
                timeout={SHORT_TIMEOUT}
                classNames="LoadingBlock">
                <LoadingBlock innerRef={nodeRef}/>
            </CSSTransition>
        </div>
    )
}
