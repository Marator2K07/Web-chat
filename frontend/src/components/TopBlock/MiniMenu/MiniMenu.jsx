import React from 'react'
import classes from './MiniMenu.module.css'
import MiniMenuItem from './MiniMenuItem/MiniMenuItem';

const loginUrl = '/logout';
const getTokensUrl = '/api/token/invalidate';

export default function MiniMenu({innerRef,
                                  user,
                                  ...props}) { 
    const items = {
        infoItem: { 
            url: '/',
            info: 'О приложении',
            route: '/',
            extraRoute: '/'
        },
        logoutItem: { 
            url: '/',
            info: 'Выйти из аккаунта',
            route: loginUrl,
            extraRoute: getTokensUrl
        } 
    };
    
    return (
        <div ref={innerRef} className={classes.MiniMenu} {...props}>
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
