import { React, useEffect } from 'react'
import classes from './BeforeLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationCollection from '../../Collection/NavigationCollection/NavigationCollection';
import { cookies, loadLastMainBlock } from '../../../contexts/CookieContext';
import { BEFORE_LOGIN_PAGE_BLOCKS_COUNT, BEFORE_LOGIN_PAGE_START_INDEX } from '../../../constants';

export default function BeforeLoginPage({...props}) {
    const { currentBlock, goNavigationWithAnimation } = useNavigationContext();

    useEffect(() => {
         cookies.remove('username');
         cookies.remove('token');
        let lastMainBlock = loadLastMainBlock('lastBeforeLoginBlock');
        if (lastMainBlock) {
            goNavigationWithAnimation(lastMainBlock);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className={classes.BeforeLoginPage} {...props}>
            <TopBlock />
            <NavigationCollection
                currentIndex={currentBlock.index}
                startIndex={BEFORE_LOGIN_PAGE_START_INDEX}
                endIndex={BEFORE_LOGIN_PAGE_START_INDEX+
                    BEFORE_LOGIN_PAGE_BLOCKS_COUNT}
            />  
            <MainBlock />
            <DownBlock />
        </div>
    )
}
