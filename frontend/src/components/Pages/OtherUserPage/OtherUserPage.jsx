import React, { useLayoutEffect } from 'react'
import classes from './OtherUserPage.module.css'
import DownBlock from '../../DownBlock/DownBlock';
import TopBlock from '../../TopBlock/TopBlock';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import MainBlock from '../../MainBlock/MainBlock';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useSearchParams } from 'react-router-dom';
import { GET_OTHER_USER_ROUTE, SHORT_DELAY } from '../../../constants';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';

export default function OtherUserPage({ ...props }) {
    const { startLoading, stopLoading, toggleHolding } = useLoadingContext();
    const { resetResult, makeGetRequest } = useResponseHandlerContext();
    const { loadBufferUser } = useUserContext();
    const { goNavigation } = useNavigationContext();
    const [searchParams] = useSearchParams(); // анализ переданных параметров в url

    // подгрузка данных о другом пользователе
    const loadUserInfo = async () => {
        let username = searchParams.get('username');
        startLoading();
        resetResult();

        makeGetRequest(
            `${GET_OTHER_USER_ROUTE}/${username}`,
            (response) => {
                loadBufferUser(response.data);
                toggleHolding(false, SHORT_DELAY);
            },
            toggleHolding(false, SHORT_DELAY)
        );

        stopLoading();
    }

    // вызов перехода в нужный блок при загрузке
    useLayoutEffect(() => {
        loadUserInfo();
        goNavigation('otherUserBlock');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.OtherUserPage} {...props}>
            <TopBlock />
            <MainBlock />
            <DownBlock />
        </div>
    )
}
