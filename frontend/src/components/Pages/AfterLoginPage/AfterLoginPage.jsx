import React, { useLayoutEffect } from 'react'
import classes from './AfterLoginPage.module.css'
import TopBlock from '../../TopBlock/TopBlock';
import MainBlock from '../../MainBlock/MainBlock';
import DownBlock from '../../DownBlock/DownBlock';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import {
    BEFORE_LOGIN_PATH,
    DATE_FORMAT,
    GET_ALL_USER_INFO_URL,
    SHORT_DELAY
} from '../../../constants';
import { cookies } from '../../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationCollection from '../../Collection/NavigationCollection/NavigationCollection';

export default function AfterLoginPage({...props}) {
    const { startLoading, toggleHolding, stopLoading } = useLoadingContext();
    const { resetResult, makeGetRequest } = useResponseHandlerContext();  
    const { loadUser, loadAboutUser, loadRooms } = useUserContext();
    const { index, goNavigation } = useNavigationContext();   
    const navigate = useNavigate();     

    // первым делом подгружаем все данные о пользователе
    const updateUser = async () => {                
        startLoading();
        resetResult();
        await makeGetRequest(
            `${GET_ALL_USER_INFO_URL}/${cookies.get('username')}`,
            async (response) => {
                loadUser(response.data.user);
                response.data.aboutUser.dateOfBirth =
                    dayjs(response.data.aboutUser.dateOfBirth).format(DATE_FORMAT);
                loadAboutUser(response.data.aboutUser);
                loadRooms(response.data.rooms);
                toggleHolding(false, SHORT_DELAY);
            },
            () => {
                setTimeout(() => {
                    toggleHolding(false, SHORT_DELAY);
                    navigate(BEFORE_LOGIN_PATH);
                }, SHORT_DELAY);
            }
        );
        stopLoading();
    }

    useLayoutEffect(() => {        
        updateUser();
        goNavigation('welcomeBlock');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.AfterLoginPage} {...props}>
            <TopBlock/>
            <NavigationCollection
                currentIndex={index}
                startIndex={2}
                endIndex={6}/>  
            <MainBlock/>
            <DownBlock/>
        </div>
    )
}
