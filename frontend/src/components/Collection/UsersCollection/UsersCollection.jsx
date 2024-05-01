import React from 'react'
import classes from './UsersCollection.module.css'
import './UsersCollectionCSSTransition.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MEDIUM_TIMEOUT, ANOTHER_USER_PAGE_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import UserItemView from '../../View/UserItemView/UserItemView';

export default function UsersCollection({users,
                                         clue,
                                         button,
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
            navigate(`${ANOTHER_USER_PAGE_URL}?username=${username}`);
        }        
    }

    return (
        <div className={classes.UsersCollection} {...props}>
            <TransitionGroup>
                    {Object.keys(users).map((key, index) => (
                        <CSSTransition
                            key={index}
                            timeout={MEDIUM_TIMEOUT}
                            classNames="UsersCollection">
                                <UserItemView 
                                    user={users[key]}
                                    button={button} />
                        </CSSTransition>
                    ))}
            </TransitionGroup>        
            {
                Object.keys(users).length > 0
                    ? ''
                    : <p>{clue}</p>
            } 
        </div>
    )
}
