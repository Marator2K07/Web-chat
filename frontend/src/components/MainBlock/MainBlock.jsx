import React, { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './MainBlock.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock';
import DynamicComponent from './DynamicMainBlock';
import { cookies } from '../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';

// в случае если пользователь уже зашел в аккаунт
const jumpUrl = '/authorized_user';

export default function MainBlock({handleNavigate, 
                                   currentMainBlock,
                                   ...props}) {
    const { 
        holding,
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const nodeRef = useRef(null);  
    const navigate = useNavigate();

    // автоматический плавный переход на страницу аккаунта
    useEffect(() => {
        let username = cookies.get('username');
        let token = cookies.get('token');
        if (username && token && currentMainBlock === 'login') {
            startLoading();
            setTimeout(() => {   
                stopLoading();             
                navigate(`${jumpUrl}/${username}`, { replace: true });                
            }, 700);            
            toggleHolding(false, 700);
        }   
    }, [
        navigate,
        currentMainBlock,
        startLoading,
        stopLoading,
        toggleHolding
    ]);    

    return (
        <div className={classes.MainBlock} {...props}>
            <DynamicComponent component={currentMainBlock}/>
            <CSSTransition 
                in={holding}
                nodeRef={nodeRef}
                timeout={333}
                classNames="LoadingBlock">
                <LoadingBlock 
                    innerRef={nodeRef}
                    handleNavigate={handleNavigate}/>
            </CSSTransition>
        </div>
    )
}
