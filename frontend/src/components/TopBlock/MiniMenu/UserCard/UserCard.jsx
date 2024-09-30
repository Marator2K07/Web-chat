import React from 'react'
import classes from './UserCard.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider'
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';
import { cookies } from '../../../../contexts/CookieContext';
import { COOKIES_TOKEN, COOKIES_USERNAME } from '../../../../constants';

export default function UserCard({...props}) {
    const { user, aboutUser } = useUserContext();
    const { navigationBlocks, goNavigationWithAnimation } = useNavigationContext();

    // в случае если пользователь не установил картинку - ставим
    // картинку по умолчанию из файлов проекта
    const userImg = !aboutUser || !aboutUser.image
        ? `${window.location.origin}/DefUserIcon.png`
        : aboutUser.image;

    function handleNavigation() {
        if (cookies.get(COOKIES_USERNAME) && cookies.get(COOKIES_TOKEN)) {
            goNavigationWithAnimation(navigationBlocks['personalBlock']);
        } else {
            goNavigationWithAnimation(navigationBlocks['loginBlock']);
        }
    }

    return (
        <div className={classes.UserCard}
            onClick={handleNavigation}
            {...props}> 
            <div>
                <img src={userImg} alt="" />
            </div>           
            <div>
                <p>
                    {user
                        ? `${user.username}`
                        : 'Не авторизовано'}                        
                </p>
            </div>            
        </div>
    )
}