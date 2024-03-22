import React from 'react'
import classes from './UsersCollection.module.css'
import './UsersCollectionCSSTransition.css'
import UserItem from './UserItem/UserItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MEDIUM_TIMEOUT } from '../../../constants';

export default function UsersCollection({users,
                                         buttonName,
                                         buttonHandler,
                                         ...props}) {
return (
        <div className={classes.UsersCollection} {...props}>          
            {
                users.length > 0 ? 
                <TransitionGroup>
                    {Object.keys(users).map((key, index) => (
                        <CSSTransition
                            key={index}
                            timeout={MEDIUM_TIMEOUT}
                            classNames="UsersCollection">
                                <UserItem user={users[key]}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                :
                <p>...Пусто...</p>
            } 
        </div>
    )
}
