import React, { useCallback, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './MainBlock.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock';
import DynamicComponent from './DynamicMainBlock';
import { motion } from "framer-motion";
import { cookies } from '../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import { useMainBlockAnimationContext } from '../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { AFTER_LOGIN_PATH, SHORT_DELAY, SHORT_TIMEOUT } from '../../constants';
import { useNavigationContext } from '../../contexts/NavigationContext/NavigationProvider';

export default function MainBlock({...props}) {
    const {currentBlock} = useNavigationContext();
    const {
        holding,
        toggleHolding,
        startLoading,
        stopLoading
    } = useLoadingContext();
    const {x, opacity, duration} = useMainBlockAnimationContext();
    const nodeRef = useRef(null);  
    const navigate = useNavigate();

    const smartNav = useCallback(() => {
        let username = cookies.get('username');
        let token = cookies.get('token');
        if (username && token && currentBlock.path === 'login') {
            startLoading();            
            setTimeout(() => {
                stopLoading();
                toggleHolding(false, 0);
                navigate(`${AFTER_LOGIN_PATH}/${username}`, { replace: true });                
            }, SHORT_DELAY);
        } 
    }, [
        navigate,
        currentBlock,
        startLoading,
        stopLoading,
        toggleHolding
    ]); 

    // автоматический переход на страницу аккаунта в случае 
    // не выхода из аккаунта и закрытии браузера
    useEffect(() => {
        smartNav();
    }, [smartNav]);    

    return (
        <div className={classes.MainBlock} {...props}>
            <motion.div
                animate={{ x: x, opacity: opacity }}
                transition={{
                  duration: duration,
                  ease: [0.11, 0.9, 0.4, 1.11]
                }}>
                <DynamicComponent component={currentBlock.path} />
            </motion.div>
            <CSSTransition
                in={holding}
                nodeRef={nodeRef}
                timeout={SHORT_TIMEOUT}
                classNames="LoadingBlock">
                <LoadingBlock innerRef={nodeRef} />
            </CSSTransition>
        </div>
    )
}