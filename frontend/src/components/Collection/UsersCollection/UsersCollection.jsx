import React from 'react'
import classes from './UsersCollection.module.css'
import './UsersCollectionCSSTransition.css'
import UserItem from './UserItem/UserItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ANOTHER_USER_ROUTE, MEDIUM_TIMEOUT } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';

export default function UsersCollection({users,
                                         clue,
                                         buttonName,
                                         buttonHandler,
                                         ...props}) {
    const { goNavigationWithAnimation } = useNavigationContext();
    const { user } = useUserContext();
    const navigate = useNavigate();

    // если выбрали себя, то идем на свою личную вкладку,
    // иначе новая страница с другим пользователем
    const navigateHandler = async (username) => {
        if (user.username === username) {
            goNavigationWithAnimation('personalBlock');
        } else {
            navigate(`${ANOTHER_USER_ROUTE}?username=${username}`);
        }        
    }

    return (
        <div className={classes.UsersCollection} {...props}> 
            {console.log(Object.keys(users))} 
            <TransitionGroup>
                    {Object.keys(users).map((key, index) => (
                        <CSSTransition
                            key={index}
                            timeout={MEDIUM_TIMEOUT}
                            classNames="UsersCollection">
                                <UserItem
                                    user={users[key]}
                                    buttonName={buttonName}
                                    buttonHandler={buttonHandler}
                                    navigateHandler={navigateHandler}/>
                        </CSSTransition>
                    ))}
            </TransitionGroup>        
            {
                Object.keys(users).length > 0
                ? ''
                :<p>{clue}</p>
            } 
        </div>
    )
}
