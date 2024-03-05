import { React, useState } from 'react'
import classes from './AppPage.module.css'
import TopBlock from '../TopBlock/TopBlock'
import DownBlock from '../DownBlock/DownBlock'
import MainBlock from '../MainBlock/MainBlock';

export default function AppPage({user, ...props}) {  
    const [headerText, setHeaderText] = useState("Вход в аккаунт");
    const [currentMainBlock, setCurrentMainBlock] = useState('loginMainBlock');
    
    return (
        <div className={classes.AppPage} {...props}>
            <TopBlock headerText={headerText} user={user}/>  
            <MainBlock user={user}
                       currentMainBlock={currentMainBlock}
                       setCurrentMainBlock={setCurrentMainBlock}
                       setHeaderText={setHeaderText}/>
            <DownBlock/>
        </div>
    )
}
