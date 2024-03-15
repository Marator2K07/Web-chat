import React, { useEffect, useState } from 'react'
import classes from './AfterLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock';
import NavList from '../../Navigation/NavList/NavList';
import MainBlock from '../../MainBlock/MainBlock';
import DownBlock from '../../DownBlock/DownBlock';
import { useLocation, useNavigate } from 'react-router-dom';
import WebChatClient from '../../../WebChatClient';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

export default function AfterLoginPage({...props}) {
    const pagesData = {
        welcomeRoot: {path: 'welcome', description: 'Добро пожаловать', index: 0}
    } 

    const { 
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const { 
        resetResult,
        toggleResponse,
        toggleError
    } = useResponseHandlerContext();
    const { toggleUser } = useUserContext();
    const [headerText, setHeaderText] = useState('Добро пожаловать');
    const [currentMainBlock, setCurrentMainBlock] = useState('welcome');
    const [currentIndex, setCurrentIndex] = useState(null); 
    const location = useLocation(); 
    const navigate = useNavigate();     

    const handleNavigate = (key) => {
        setCurrentMainBlock(pagesData[key].path);
        setHeaderText(pagesData[key].description);
        setCurrentIndex(pagesData[key].index);
    }

    // первым делом подгружаем все данные о пользователе
    const updateUser = async () => {
        // подготовка
        startLoading();
        resetResult();
        // сам запрос и его обработка
        await WebChatClient.get(location.pathname)
        .then(function (response) {      
            toggleResponse(response);
            toggleUser(response.data.user);
            toggleHolding(false, 1000)
        })
        .catch(function (error) {
            toggleError(error);
            setTimeout(() => {
                navigate('/');  
            }, 1500);
        });
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
