import React, { useEffect, useState } from 'react'
import classes from './EndRecoveryPage.module.css'
import EndRecoveryMainBlock from '../../MainBlock/Elements/EndRecoveryMainBlock/EndRecoveryMainBlock';
import DownBlock from '../../DownBlock/DownBlock';
import Spacer from '../../Helper/Spacer/Spacer';
import { motion } from "framer-motion";
import LoadingBlock from '../../LoadingBlock/LoadingBlock';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useSearchParams } from 'react-router-dom';
import { SYNCHRONIZE_RECOVERY_ROUTE } from '../../../constants';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import TipsBlock from '../../TipsBlock/TipsBlock';
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';

export default function EndRecoveryPage({...props}) {
    const { holding, startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { tips } = useTipsContext();
    const [currentUser, setCurrentUser] = useState();
    const [searchParams] = useSearchParams(); // анализ переданных параметров в url

    // состояния компонента загрузки
    const animationStates = {
        visible: {opacity: 1},
        hidden: {opacity: 0}
    }

    const animationStatesForTips = {
        visible: {opacity: 0.9},
        hidden: {opacity: 0}
    }

    // обработка синхронизации данных 
    const handleSynchronize = async () => {
        let userTokenAndId = searchParams.get('user');
        startLoading();
        resetResult();
        makePostRequest(
            SYNCHRONIZE_RECOVERY_ROUTE,
            { userTokenAndId: userTokenAndId },
            (response) => {
                setCurrentUser(response.data.user);
            }
        );
        stopLoading();        
    }

    // вызов синхронизации при запуске страницы
    useEffect(() => {        
        handleSynchronize(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.EndRecoveryPage} {...props}>
            <motion.div 
                variants={animationStates}
                animate={holding ? "visible"
                                 : "hidden"}>
                <LoadingBlock />
            </motion.div>
            <Spacer sizeW='10px' sizeH='13%'/>
            <h3>Восстановление аккаунта</h3>
            <EndRecoveryMainBlock user={currentUser} />
            <motion.div
                variants={animationStatesForTips}
                transition={{ ease: "linear", duration: 0.2 }}
                animate={Object.keys(tips).length > 0 ? "visible"
                                                      : "hidden"}>
                <TipsBlock />
            </motion.div>
            <Spacer sizeW='10px' sizeH='13%'/>
            <DownBlock />
        </div>
    )
}
