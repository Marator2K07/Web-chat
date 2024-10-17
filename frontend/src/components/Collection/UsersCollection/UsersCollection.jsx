import React from 'react'
import classes from './UsersCollection.module.css'
import './UsersCollectionCSSTransition.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MEDIUM_TIMEOUT } from '../../../constants';
import UserItemView from '../../View/UserItemView/UserItemView';

export default function UsersCollection({users,
                                         clue,
                                         button,
                                         ...props}) {
    return (
        <div className={classes.UsersCollection} {...props}>
            <TransitionGroup>
                {Object.keys(users).map((key, index) => (
                    <CSSTransition
                        key={index}
                        timeout={MEDIUM_TIMEOUT}
                        classNames="UsersCollection">
                        <UserItemView
                            thisUser={users[key]}
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
