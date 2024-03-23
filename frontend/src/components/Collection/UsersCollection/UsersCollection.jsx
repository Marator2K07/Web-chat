import React from 'react'
import classes from './UsersCollection.module.css'
import './UsersCollectionCSSTransition.css'
import UserItem from './UserItem/UserItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MEDIUM_TIMEOUT } from '../../../constants';

export default function UsersCollection({users,
                                         clue,
                                         buttonName,
                                         buttonHandler,
                                         ...props}) {
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
                                    buttonHandler={buttonHandler}/>
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
