import React from 'react'
import classes from './RoomsCollection.module.css'
import './RoomsCollectionCSSTransition.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SHORT_TIMEOUT } from '../../../constants';
import RoomItem from './RoomItem/RoomItem';

export default function RoomsCollection({items, ...props}) {
    return (
        <div className={classes.RoomsCollection} {...props}>
            <TransitionGroup>
                {Object.keys(items).map((key, index) => (
                    <CSSTransition
                        key={index}
                        timeout={SHORT_TIMEOUT}
                        classNames="RoomsCollection">
                            <RoomItem item={items[key]}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
