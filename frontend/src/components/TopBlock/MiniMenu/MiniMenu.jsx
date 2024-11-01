import React from 'react'
import classes from './MiniMenu.module.css'
import UserCard from './UserCard/UserCard';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { useNavigate } from 'react-router-dom';
import { BEFORE_LOGIN_PAGE_URL, COOKIES_REFRESH_TOKEN, LOGOUT_ROUTE } from '../../../constants';
import { cookies, removeUserCookies } from '../../../contexts/CookieContext';
import MenuCollection from '../../Collection/MenuCollection/MenuCollection';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';

export default function MiniMenu({ innerRef, ...props }) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { user, clearUserContext } = useUserContext();
    const navigate = useNavigate();

    const items = {
        logout: {
            info: "Выйти из аккаунта",
            action: async () => {
                startLoading();
                resetResult();

                await makePostRequest(
                    LOGOUT_ROUTE,
                    { refreshToken: cookies.get(COOKIES_REFRESH_TOKEN) },
                    () => {
                        clearUserContext();
                        removeUserCookies();
                        navigate(BEFORE_LOGIN_PAGE_URL, { replace: true });
                    }
                );

                stopLoading();
            }
        }
    }

    return (
        <div
            ref={innerRef}
            className={classes.MiniMenu}
            {...props}
        >
            <UserCard />
            {
                user &&
                <MenuCollection items={items} />
            }
        </div>
    )
}
