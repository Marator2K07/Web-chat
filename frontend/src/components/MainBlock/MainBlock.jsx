import React, { useCallback, useEffect } from 'react'
import classes from './MainBlock.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock';
import DynamicComponent from './DynamicMainBlock';
import { motion } from "framer-motion";
import { cookies } from '../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import { useMainBlockAnimationContext } from '../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { AFTER_LOGIN_PAGE_URL, COOKIES_TOKEN, COOKIES_USERNAME, SHORT_DELAY } from '../../constants';
import { useNavigationContext } from '../../contexts/NavigationContext/NavigationProvider';
import TipsBlock from '../TipsBlock/TipsBlock';
import { useTipsContext } from '../../contexts/TipsContext/TipsProvider';
import ScrollableVertical from '../Helper/ScrollableVertical/ScrollableVertical';

export default function MainBlock({ ...props }) {
    const { currentBlock } = useNavigationContext();
    const { x, y, opacity, duration } = useMainBlockAnimationContext();
    const { tips, updateTipsCoordinates } = useTipsContext();
    const {
        holding,
        toggleHolding,
        startLoading,
        stopLoading
    } = useLoadingContext();
    const navigate = useNavigate();

    const animationLoadStates = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    const animationStatesForTips = {
        visible: { opacity: 0.9 },
        hidden: { opacity: 0 }
    }

    const smartNav = useCallback(() => {
        let username = cookies.get(COOKIES_USERNAME);
        let token = cookies.get(COOKIES_TOKEN);

        if (username && token && currentBlock.path === 'login') {
            startLoading();
            setTimeout(() => {
                stopLoading();
                toggleHolding(false, 0);
                navigate(
                    `${AFTER_LOGIN_PAGE_URL}/${username}`,
                    { replace: true }
                );
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
        <div
            className={classes.MainBlock}
            onWheel={updateTipsCoordinates}
            {...props}
        >
            <motion.div
                animate={{
                    x: x,
                    y: y,
                    opacity: opacity
                }}
                transition={{
                    duration: duration,
                    ease: [0.11, 0.9, 0.4, 1.11]
                }}>
                <ScrollableVertical>
                    <DynamicComponent component={currentBlock.path} />
                </ScrollableVertical>
            </motion.div>
            <motion.div
                variants={animationLoadStates}
                transition={{ ease: "linear", duration: 0.4 }}
                animate={holding ? "visible" : "hidden"}>
                <LoadingBlock />
            </motion.div>
            <motion.div
                variants={animationStatesForTips}
                transition={{ ease: "linear", duration: 0.2 }}
                animate={
                    Object.keys(tips).length > 0
                        ? "visible"
                        : "hidden"
                }
            >
                <TipsBlock />
            </motion.div>
        </div>
    )
}