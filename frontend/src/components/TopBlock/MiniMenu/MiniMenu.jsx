import React from 'react'
import classes from './MiniMenu.module.css'
import MiniMenuItem from './MiniMenuItem/MiniMenuItem';
import UserCard from './UserCard/UserCard';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';

const getTokensUrl = '/api/token/invalidate';

export default function MiniMenu({innerRef, ...props}) { 
    const items = {
        infoItem: {            
            url: '/',
            route: '/',
            info: '//////////////'
        },
        logoutItem: {            
            url: getTokensUrl,
            route: '/',
            info: 'Выйти из аккаунта',
            clean: true
        } 
    };
    const { user } = useUserContext();
    
    return (
        <div ref={innerRef} className={classes.MiniMenu} {...props}>
            <UserCard/>
            {Object.keys(items).map((key) => (
                <div key={key}>
                    { user && 
                        <MiniMenuItem
                            url={items[key].url}
                            info={items[key].info}
                            route={items[key].route}
                            clean={items[key].clean}/>
                    }
                </div>
            ))}
        </div>
    )
}
