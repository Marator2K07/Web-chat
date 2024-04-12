import React, { useEffect } from 'react'
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
    DATE_FORMAT,
    GET_ALL_USER_INFO_ROUTE,
    SHORT_DELAY
} from '../../../constants';
import { cookies, loadLastMainBlock } from '../../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationCollection from '../../Collection/NavigationCollection/NavigationCollection';

export default function AfterLoginPage({...props}) {
    const { startLoading, toggleHolding, stopLoading } = useLoadingContext();
    const { resetResult, makeGetRequest } = useResponseHandlerContext();  
    const { loadUser, loadAboutUser, loadRooms } = useUserContext();
    const { index, goNavigationWithAnimation } = useNavigationContext();   
    const navigate = useNavigate();     

    // первым делом подгружаем все данные о пользователе
    const updateUser = async () => {                
        startLoading();
        resetResult();
        await makeGetRequest(
            `${GET_ALL_USER_INFO_ROUTE}/${cookies.get('username')}`,
            async (response) => {
                loadUser(response.data.user);
                response.data.aboutUser.dateOfBirth =
                    dayjs(response.data.aboutUser.dateOfBirth).format(DATE_FORMAT);
                loadAboutUser(response.data.aboutUser);
                loadRooms(response.data.rooms);
            },
            () => {
                setTimeout(() => {
                    toggleHolding(false, SHORT_DELAY);
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
