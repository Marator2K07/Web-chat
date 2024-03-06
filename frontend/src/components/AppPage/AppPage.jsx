import { React, useState } from 'react'
import classes from './AppPage.module.css'
import TopBlock from '../TopBlock/TopBlock'
import DownBlock from '../DownBlock/DownBlock'
import MainBlock from '../MainBlock/MainBlock';
import NavList from '../Navigation/NavList/NavList';

export default function AppPage({user, ...props}) {  
    const [headerText, setHeaderText] = useState("Вход в аккаунт");
    const [currentMainBlock, setCurrentMainBlock] = useState('login');
    
    function handleNavigate(path, text) {
        setCurrentMainBlock(path);
        setHeaderText(text);
    }
    
    return (
        <div className={classes.AppPage} {...props}>
            <TopBlock headerText={headerText} user={user}/>
            <NavList handleNavigate={handleNavigate}/>  
            <MainBlock 
                user={user}
                currentMainBlock={currentMainBlock}
                setCurrentMainBlock={setCurrentMainBlock}
                setHeaderText={setHeaderText}/>
            <DownBlock/>
        </div>
    )
}
