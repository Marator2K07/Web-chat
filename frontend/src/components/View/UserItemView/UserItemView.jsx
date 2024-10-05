import React, { useState } from 'react'
import classes from './UserItemView.module.css'
import Loadable from '../../Helper/Loadable/Loadable';
import { cookies } from '../../../contexts/CookieContext';
import {
    ANOTHER_USER_PAGE_URL, 
    COOKIES_USERNAME, 
    GET_ABOUT_USER_ROUTE_END
} from '../../../constants';
import UserItem from '../../Collection/UsersCollection/UserItem/UserItem';
import { useNavigate } from 'react-router-dom';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';

export default function UserItemView({thisUser, button, ...props}) {
    const [aboutUser, loadAboutUser] = useState(null);
    const { navigationBlocks, goNavigationWithAnimation } = useNavigationContext();
    const { user } = useUserContext();
    const navigate = useNavigate();

    // если выбрали себя, то идем на свою личную вкладку,
    // иначе новая страница с другим пользователем
    function navigateHandler(username) {        
        if (user.username === username) {
            goNavigationWithAnimation(navigationBlocks.personalBlock);
        } else {
            navigate(`${ANOTHER_USER_PAGE_URL}?username=${username}`);
        }        
    }

    if (aboutUser) {
        return (
            <div className={classes.AboutUserView}
                onClick={() => navigateHandler(thisUser.username)}
                {...props}>
                <UserItem 
                    user={thisUser}
                    aboutUser={aboutUser} 
                    button={button} />
            </div>
        )
    } else {
        return (
            <Loadable 
                isWorking={cookies.get(COOKIES_USERNAME)}
                propertyName={'aboutUser'}
                getDataUrl={`${ANOTHER_USER_PAGE_URL}/${thisUser.username}${GET_ABOUT_USER_ROUTE_END}`}
                setDataFunc={loadAboutUser} />
        )
    }
}
