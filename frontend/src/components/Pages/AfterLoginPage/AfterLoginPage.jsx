import React, { useEffect, useState } from 'react'
import classes from './AfterLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock';
import NavList from '../../Navigation/NavList/NavList';
import MainBlock from '../../MainBlock/MainBlock';
import DownBlock from '../../DownBlock/DownBlock';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useMainBlockAnimationContext } from '../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import {
    BEFORE_LOGIN_ROUTE,
    DATE_FORMAT,
    EXTRA_SHORT_DELAY,
    GET_ALL_USER_INFO_URL,
    SHORT_DELAY
} from '../../../constants';
import { cookies } from '../../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function AfterLoginPage({...props}) {
    const blocksData = {
        welcomeBlock: {path: 'welcome', description: 'Добро пожаловать', index: 0},
        personalBlock: {path: 'personal', description: 'Личная страница', index: 1},
        communicationBlock: {path: 'communication', description: 'Общение', index: 2}
    } 
    const { startLoading, toggleHolding, stopLoading } = useLoadingContext();
    const { resetResult, makeGetRequest } = useResponseHandlerContext();
    const { 
        initCondition,
        leftCondition,
        rightCondition
    } = useMainBlockAnimationContext();    
    const { loadUser, loadAboutUser } = useUserContext();

    const [headerText, setHeaderText] = useState('Добро пожаловать');
    const [currentMainBlock, setCurrentMainBlock] = useState('welcome');
    const [currentIndex, setCurrentIndex] = useState(null); 
    const navigate = useNavigate();     

    // переход между вкладками с анимацией
    const handleNavigate = (key) => {
        currentIndex < blocksData[key].index ? leftCondition()
                                            : rightCondition();
        setTimeout(() => {
            setCurrentMainBlock(blocksData[key].path);
            setHeaderText(blocksData[key].description);
            setCurrentIndex(blocksData[key].index);
            currentIndex < blocksData[key].index ? rightCondition() 
                                                : leftCondition();
            setTimeout(() => {
                initCondition();
            }, EXTRA_SHORT_DELAY);
        }, EXTRA_SHORT_DELAY);        
    }

    // первым делом подгружаем все данные о пользователе
    const updateUser = async () => {                
        startLoading();
        resetResult();
        await makeGetRequest(
            `${GET_ALL_USER_INFO_URL}/${cookies.get('username')}`,
            async (response) => {
                loadUser(response.data.user);
                response.data.aboutUser.dateOfBirth =
                    dayjs(response.data.aboutUser.dateOfBirth).format(DATE_FORMAT);
                loadAboutUser(response.data.aboutUser);
                toggleHolding(false, SHORT_DELAY);
            },
            () => {
                setTimeout(() => {
                    toggleHolding(false, SHORT_DELAY);
                    navigate(BEFORE_LOGIN_ROUTE);  
                }, SHORT_DELAY);
            }
        );
        stopLoading();
    }

    useEffect(() => {
        updateUser();
        setCurrentIndex(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.AfterLoginPage} {...props}>
            <TopBlock headerText={headerText}/>
            <NavList
                handleNavigate={handleNavigate}
                blocksData={blocksData}
                currentIndex={currentIndex}/>  
            <MainBlock
                handleNavigate={handleNavigate}
                currentMainBlock={currentMainBlock}/>
            <DownBlock/>
        </div>
    )
}
