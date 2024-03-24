import React from 'react'
import classes from './MessageItem.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider'

export default function MessageItem({message, ...props}) {
    const { user } = useUserContext();
    
    return (
        <div className={classes.MessageItem} {...props}>
            <div>
                <p>{message.information}</p>
            </div>
            <div>                
                <h6>
                    {user.id !== message.sender.id 
                        ? " Это новость другого пользователя"
                        : ''} 
                    {message.dispatch_time}
                    {user.id === message.sender.id 
                        ? " Это ваша новость"
                        : ''}
                </h6> 
            </div>   
        </div>
    )
}
