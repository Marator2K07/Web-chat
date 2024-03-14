import React, { useState } from 'react'
import classes from './AfterLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock';
import NavList from '../../Navigation/NavList/NavList';
import MainBlock from '../../MainBlock/MainBlock';
import DownBlock from '../../DownBlock/DownBlock';

export default function AfterLoginPage({user, ...props}) {
    // можно сразу объявить весь рутинг
    const pagesData = {
        loginRoot: {path: 'login', description: 'Вход в аккаунт', index: 0}
    } 
    const [headerText, setHeaderText] = useState("Вход в аккаунт");
    const [currentMainBlock, setCurrentMainBlock] = useState('login');
    const [currentIndex, setCurrentIndex] = useState(null);  

    const handleNavigate = (key) => {
        setCurrentMainBlock(pagesData[key].path);
        setHeaderText(pagesData[key].description);
        setCurrentIndex(pagesData[key].index);
    }

    return (
        <div className={classes.AfterLoginPage} {...props}>
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
