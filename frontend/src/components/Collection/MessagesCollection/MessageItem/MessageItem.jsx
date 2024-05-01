import React from 'react'
import classes from './MessageItem.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider'
import { ANOTHER_USER_PAGE_URL } from '../../../../constants';
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';
import { useNavigate } from 'react-router-dom';

export default function MessageItem({message, ...props}) {
    const { goNavigationWithAnimation } = useNavigationContext();
    const { user } = useUserContext();
    const navigate = useNavigate();

    // при выборе пользователя можно перейти на его страницу
    const goToUserPage = async (username) => {
        if (message.sender.username === username) {
            goNavigationWithAnimation('personalBlock');
        } else {
            navigate(`${ANOTHER_USER_PAGE_URL}?username=${message.sender.username}`);
        }        
    }    
    
    return (
        <div
            className={classes.MessageItem}
            onClick={() => goToUserPage(user.username)} {...props}>
            <div>
                <p>{message.information}</p>
            </div>
            <div>                
                <h6>
                    {user.id !== message.sender.id 
                        ? `${message.sender.username} `
                        : ''} 
                    {message.dispatch_time}
                    {user.id === message.sender.id 
                        ? " Это ваше сообщение"
                        : ''}
                </h6> 
            </div>   
        </div>
    )
}
