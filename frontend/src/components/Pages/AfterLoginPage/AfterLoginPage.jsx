import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import classes from './AfterLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock';
import MainBlock from '../../MainBlock/MainBlock';
import DownBlock from '../../DownBlock/DownBlock';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import {
    AFTER_LOGIN_PAGE_BLOCKS_COUNT,
    AFTER_LOGIN_PAGE_START_INDEX,
    BEFORE_LOGIN_PAGE_BLOCKS_COUNT,
    BEFORE_LOGIN_PAGE_URL,
    GET_ABOUT_USER_ROUTE_END,
    SHORT_DELAY
} from '../../../constants';
import { loadLastMainBlock } from '../../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationCollection from '../../Collection/NavigationCollection/NavigationCollection';

export default function AfterLoginPage({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makeGetRequest } = useResponseHandlerContext();  
    const { aboutUser, loadUser, loadAboutUser } = useUserContext();
    const {
        currentBlock,
        navigationBlocks,
        goNavigationWithAnimation
    } = useNavigationContext();   
    const navigate = useNavigate();
    const location = useLocation();     

    // первым делом подгружаем все данные о пользователе
    const updateUser = async () => {                
        startLoading();
        resetResult();
        await makeGetRequest(
            location.pathname,
            async (response) => {
                loadUser(response.data.user);
                if (!aboutUser) {
                    await makeGetRequest(
                        location.pathname + GET_ABOUT_USER_ROUTE_END,
                        (response) => {
                            loadAboutUser(response.data.aboutUser)
                        }
                    );
                }                
            },
            () => {
                setTimeout(() => {
                    navigate(BEFORE_LOGIN_PAGE_URL);
                }, SHORT_DELAY);
            }
        );
        stopLoading();
    }

    useEffect(() => {  
        // cookies.remove('username');
        // cookies.remove('token');
        updateUser();
        let lastMainBlock = loadLastMainBlock('lastAfterLoginBlock');
        if (lastMainBlock) {
            goNavigationWithAnimation(lastMainBlock);
        } else {
            goNavigationWithAnimation(navigationBlocks.welcomeBlock)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.AfterLoginPage} {...props}>
            <TopBlock />
            <NavigationCollection
                currentIndex={currentBlock.index-
                    BEFORE_LOGIN_PAGE_BLOCKS_COUNT}
                startIndex={AFTER_LOGIN_PAGE_START_INDEX}
                endIndex={AFTER_LOGIN_PAGE_START_INDEX+
                    AFTER_LOGIN_PAGE_BLOCKS_COUNT}
            />  
            <MainBlock />
            <DownBlock />
        </div>
    )
}
