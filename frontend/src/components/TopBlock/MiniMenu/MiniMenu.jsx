import React from 'react'
import classes from './MiniMenu.module.css'
import MiniMenuItem from './MiniMenuItem/MiniMenuItem';
import UserCard from './UserCard/UserCard';

const loginUrl = '/logout';
const getTokensUrl = '/api/token/invalidate';

export default function MiniMenu({innerRef, ...props}) { 
    const items = {
        infoItem: { 
            route: '/',
            info: '//////////////',
            url: '/',
            extraUrl: '/'
        },
        logoutItem: { 
            route: '/',
            info: 'Выйти из аккаунта',
            url: loginUrl,
            extraUrl: getTokensUrl
        } 
    };
    
    return (
        <div ref={innerRef} className={classes.MiniMenu} {...props}>
            <UserCard/>
            {Object.keys(items).map((key) => (
                <div key={key}>
                    <MiniMenuItem
                        url={items[key].url}
                        info={items[key].info}
                        route={items[key].route}
                        extraRoute={items[key].extraRoute}/>
                </div>
            ))}
        </div>
    )
}
