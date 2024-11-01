import React from 'react'
import classes from './MessagesCollection.module.css'
import './MessagesCollectionCSSTransition.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MEDIUM_TIMEOUT } from '../../../constants'
import MessageItem from './MessageItem/MessageItem';

export default function MessagesCollection({
    messages,
    clue,
    ...props
}) {
    return (
        <div className={classes.MessagesCollection} {...props}>
            <TransitionGroup>
                {Object.keys(messages).map((key, index) => (
                    <CSSTransition
                        key={index}
                        timeout={MEDIUM_TIMEOUT}
                        classNames="MessagesCollection">
                        <MessageItem message={messages[key]} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            {
                Object.keys(messages).length > 0
                    ? ''
                    : <p>{clue}</p>
            }
        </div>
    )
}
