import React, { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './MainBlock.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock';
import DynamicComponent from './DynamicMainBlock';
import { motion } from "framer-motion";
import { cookies } from '../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import { useMainBlockAnimationContext } from '../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { AFTER_LOGIN_ROUTE, SHORT_DELAY, SHORT_TIMEOUT } from '../../constants';

export default function MainBlock({handleNavigate, 
                                   currentMainBlock,
                                   ...props}) {
    const { holding, startLoading, stopLoading } = useLoadingContext();
    const { x, opacity, duration } = useMainBlockAnimationContext();
    const nodeRef = useRef(null);  
    const navigate = useNavigate();

    // автоматический переход на страницу аккаунта в случае 
    // не выхода из аккаунта и закрытии браузера
    useEffect(() => {
        let username = cookies.get('username');
        let token = cookies.get('token');
        if (username && token && currentMainBlock === 'login') {
            startLoading();
            setTimeout(() => {   
                stopLoading();             
                navigate(`${AFTER_LOGIN_ROUTE}/${username}`, { replace: true });                
            }, SHORT_DELAY);
        }   
    }, [
        navigate,
        currentMainBlock,
        startLoading,
        stopLoading
    ]);    

    return (
        <div className={classes.MainBlock} {...props}>
            <motion.div
            animate={{ x: x, opacity: opacity }}
            transition={{
              duration: duration,
              ease: [0.11, 0.9, 0.4, 1.11]
            }}>
                <DynamicComponent component={currentMainBlock}/>
            </motion.div>
            <CSSTransition
                in={holding}
                nodeRef={nodeRef}
                timeout={SHORT_TIMEOUT}
                classNames="LoadingBlock">
                <LoadingBlock 
                    innerRef={nodeRef}
                    handleNavigate={handleNavigate}/>
            </CSSTransition>
        </div>
    )
}
