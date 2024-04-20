import React from 'react'
import classes from './MenuCollection.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_ROUTE } from '../../../constants';
import { cookies, removeUserCookies } from '../../../contexts/CookieContext';

export default function MenuCollection({items, ...props}) {    
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const navigate = useNavigate();

    const items = {
        logout: {
            info: "Выйти из аккаунта",
            url: "/",
            action: async() => {
                startLoading();
                resetResult();
                await makePostRequest(
                    LOGOUT_ROUTE,
                    { refreshToken: cookies.get('refreshToken') },
                    () => {
                        removeUserCookies();
                        if (url)
                            navigate(url, { replace: true });
                    }
                );
                stopLoading();
            }
        }
    }

    return (
        <div className={classes.MenuCollection} {...props}>

        </div>
    )
}
