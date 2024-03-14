import { React, useEffect, useState } from 'react'
import classes from './BeforeLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock';
import NavList from '../../Navigation/NavList/NavList';

export default function BeforeLoginPage({...props}) {
    // можно сразу объявить весь рутинг
    const pagesData = {
        loginRoot: {path: 'login', description: 'Вход в аккаунт', index: 0},
        registerRoot: {path: 'register', description: 'Регистрация', index: 1}
    } 
    const [headerText, setHeaderText] = useState("Вход в аккаунт");
    const [currentMainBlock, setCurrentMainBlock] = useState('login');
    const [currentIndex, setCurrentIndex] = useState(null); 
    const user = null; // до авторизации юзер пустое место  
    
    const handleNavigate = (key) => {
        setCurrentMainBlock(pagesData[key].path);
        setHeaderText(pagesData[key].description);
        setCurrentIndex(pagesData[key].index);
    }

    useEffect(() => {
        setCurrentIndex(0);
    }, []);
    
    return (
        <div className={classes.BeforeLoginPage} {...props}>
            <TopBlock headerText={headerText} aboutUser={null}/>
            <NavList
                handleNavigate={handleNavigate}
                pagesData={pagesData}
                currentIndex={currentIndex}/>  
            <MainBlock 
                user={user}
                handleNavigate={handleNavigate}
                currentMainBlock={currentMainBlock}/>
            <DownBlock/>
        </div>
    )
}
