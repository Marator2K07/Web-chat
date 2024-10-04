import React from 'react'
import classes from './UserActivationPage.module.css'
import LoadingBlock from '../../LoadingBlock/LoadingBlock'
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { USER_ACTIVATION_ROUTE } from '../../../constants';

export default function UserActivationPage({...props}) {     
    const { resetResult, makePostRequest } = useResponseHandlerContext();    
    const [searchParams] = useSearchParams(); // анализ переданных параметров в url
    const { holding, startLoading, stopLoading } = useLoadingContext();

    // состояния компонента загрузки
    const animationStates = {
        visible: {opacity: 1},
        hidden: {opacity: 0}
    }

    // обработка активации
    const handleActivation = async () => {
        let confirmToken = searchParams.get('key');
        startLoading();
        resetResult();
        makePostRequest(
            USER_ACTIVATION_ROUTE,
            { confirmToken: confirmToken }
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
            <motion.div 
                variants={animationStates}
                animate={holding ? "visible"
                                 : "hidden"}>
                <LoadingBlock />
            </motion.div>
        </div>
    )
}
