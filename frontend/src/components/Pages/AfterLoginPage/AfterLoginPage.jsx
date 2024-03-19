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
    EXTRA_SHORT_DELAY,
    GET_ALL_USER_INFO_URL,
    SHORT_DELAY
} from '../../../constants';
import { cookies } from '../../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';

export default function AfterLoginPage({...props}) {
    const pagesData = {
        welcomeRoute: {path: 'welcome', description: 'Добро пожаловать', index: 0},
        personalPageRoute: {path: 'personalPage', description: 'Личная страница', index: 1}
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
        currentIndex < pagesData[key].index ? leftCondition()
                                            : rightCondition();
        setTimeout(() => {
            setCurrentMainBlock(pagesData[key].path);
            setHeaderText(pagesData[key].description);
            setCurrentIndex(pagesData[key].index);
            currentIndex < pagesData[key].index ? rightCondition() 
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
            (response) => {
                loadUser(response.data.user);
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
                pagesData={pagesData}
                currentIndex={currentIndex}/>  
            <MainBlock
                handleNavigate={handleNavigate}
                currentMainBlock={currentMainBlock}/>
            <DownBlock/>
        </div>
    )
}
