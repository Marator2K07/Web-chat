import React from 'react'
import classes from './RoomsCollection.module.css'
import './RoomsCollectionCSSTransition.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SHORT_TIMEOUT } from '../../../constants';
import RoomItem from './RoomItem/RoomItem';

export default function RoomsCollection({ items, button, ...props }) {
    return (
        <div className={classes.RoomsCollection} {...props}>
            {
                Object.keys(items).length !== 0
                    ?
                    <TransitionGroup>
                        {Object.keys(items).map((key, index) => (
                            <CSSTransition
                                key={index}
                                timeout={SHORT_TIMEOUT}
                                classNames="RoomsCollection"
                            >
                                <RoomItem
                                    item={items[key]}
                                    button={button}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    :
                    <p>Отсутствуют</p>
            }
        </div>
    )
}
