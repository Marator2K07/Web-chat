import React, { useEffect, useRef, useState } from 'react'
import classes from './OtherUserPage.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { GET_OTHER_USER_URL , SHORT_DELAY, SHORT_TIMEOUT } from '../../../constants';
import LoadingBlock from '../../LoadingBlock/LoadingBlock';
import DownBlock from '../../DownBlock/DownBlock';

export default function OtherUserPage({...props}) {
    const { 
        holding,
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const { resetResult, makeGetRequest } = useResponseHandlerContext();
    const [searchParams] = useSearchParams(); // анализ переданных параметров в url
    const [user, setUser] = useState(null);
    const nodeRef = useRef(null);

    // подгрузка данных о другом пользователе
    const loadUserInfo = async () => {
        let username = searchParams.get('username');
        console.log(username);
        startLoading();
        resetResult();
        makeGetRequest(
            `${GET_OTHER_USER_URL }/${username}`,
            (response) => {
                console.log(response.data);
                setUser(response.data);
                toggleHolding(false, SHORT_DELAY);
            },
            toggleHolding(false, SHORT_DELAY)
        );
        stopLoading();
    }

    // вызов загрузки при запуске страницы
    useEffect(() => {        
        loadUserInfo(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.OtherUserPage} {...props}>
            <h4>Страница пользователя</h4>
            <CSSTransition 
                in={holding}
                nodeRef={nodeRef}
                timeout={SHORT_TIMEOUT}
                classNames="LoadingBlock">
                <LoadingBlock innerRef={nodeRef}/>
            </CSSTransition>
            <DownBlock/>
        </div>
    )
}
