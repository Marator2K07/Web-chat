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

export default function UserItemView({ thisUser, button, ...props }) {
    const [aboutUser, loadAboutUser] = useState(null);

    if (aboutUser) {
        return (
            <div className={classes.AboutUserView} {...props}>
                <UserItem
                    user={thisUser}
                    aboutUser={aboutUser}
                    button={button}
                />
            </div>
        )
    } else {
        return (
            <Loadable
                isWorking={cookies.get(COOKIES_USERNAME)}
                propertyName={'aboutUser'}
                getDataUrl={`
                    ${ANOTHER_USER_PAGE_URL}
                    /${thisUser.username}
                    ${GET_ABOUT_USER_ROUTE_END}
                `}
                setDataFunc={loadAboutUser}
            />
        )
    }
}
