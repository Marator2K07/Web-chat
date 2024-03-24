import React, { useEffect, useRef, useState } from 'react'
import classes from './OtherUserPage.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { GET_ANOTHER_USER_URL, LONG_DELAY } from '../../../constants';
import LoadingBlock from '../../LoadingBlock/LoadingBlock';

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
            `${GET_ANOTHER_USER_URL}/${username}`,
            (response) => {
                console.log(response.data);
                setUser(response.data);
                toggleHolding(false, LONG_DELAY);
            },
            toggleHolding(false, LONG_DELAY)
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
                timeout={333}
                classNames="LoadingBlock">
                <LoadingBlock innerRef={nodeRef}/>
            </CSSTransition>
        </div>
    )
}
