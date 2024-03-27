import { React, useLayoutEffect } from 'react'
import classes from './BeforeLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationCollection from '../../Collection/NavigationCollection/NavigationCollection';
// import { cookies } from '../../../contexts/CookieContext';

export default function BeforeLoginPage({...props}) {
    const { index, goNavigation } = useNavigationContext();

    useLayoutEffect(() => {
        // cookies.remove('username');
        // cookies.remove('token');
        goNavigation('loginBlock');
    }, [goNavigation]);
    
    return (
        <div className={classes.BeforeLoginPage} {...props}>
            <TopBlock/>
            <NavigationCollection
                currentIndex={index}
                startIndex={0}
                endIndex={2}/>  
            <MainBlock/>
            <DownBlock/>
        </div>
    )
}
