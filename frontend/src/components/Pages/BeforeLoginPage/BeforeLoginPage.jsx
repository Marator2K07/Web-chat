import { React, useEffect, useState } from 'react'
import classes from './BeforeLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock';
import NavList from '../../Navigation/NavList/NavList';
import { useMainBlockAnimationContext } from '../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';
import { EXTRA_SHORT_DELAY } from '../../../constants';
import { cookies } from '../../../contexts/CookieContext';

export default function BeforeLoginPage({...props}) {
    const blocksData = {
        loginBlock: {path: 'login', description: 'Вход в аккаунт', index: 0},
        registerBlock: {path: 'register', description: 'Регистрация', index: 1}
    } 
    const { 
        initCondition,
        leftCondition,
        rightCondition
    } = useMainBlockAnimationContext();
    
    const [headerText, setHeaderText] = useState("Вход в аккаунт");
    const [currentMainBlock, setCurrentMainBlock] = useState('login');
    const [currentIndex, setCurrentIndex] = useState(null); 
    
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

    useEffect(() => {
        setCurrentIndex(0);
    }, []);
    
    return (
        <div className={classes.BeforeLoginPage} {...props}>
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
