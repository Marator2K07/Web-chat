import { React, useEffect, useState } from 'react'
import classes from './AppPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock';
import NavList from '../../Navigation/NavList/NavList';

export default function AppPage({user, ...props}) {
    // можно сразу объявить весь рутинг
    const pagesData = {
        loginRoot: {path: 'login', description: 'Вход в аккаунт', index: 0},
        registerRoot: {path: 'register', description: 'Регистрация', index: 1}
    } 
    const [headerText, setHeaderText] = useState("Вход в аккаунт");
    const [currentMainBlock, setCurrentMainBlock] = useState('login');
    const [currentIndex, setCurrentIndex] = useState(null);  
    
    const handleNavigate = (key) => {
        setCurrentMainBlock(pagesData[key].path);
        setHeaderText(pagesData[key].description);
        setCurrentIndex(pagesData[key].index);
    }

    useEffect(() => {
        setCurrentIndex(0);
    }, []);
    
    return (
        <div className={classes.AppPage} {...props}>
            <TopBlock headerText={headerText} user={user}/>
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
