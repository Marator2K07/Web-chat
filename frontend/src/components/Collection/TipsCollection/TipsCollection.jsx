import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classes from './TipsCollection.module.css'
import './TipsCollectionCSSTransition.css';
import { SHORT_TIMEOUT } from '../../../constants';
import TipItem from './TipItem/TipItem';

export default function TipsCollection({ tips, ...props }) {
    return (
        <div className={classes.TipsCollection} {...props}>
            <TransitionGroup>
                {Object.keys(tips).map((key, index) => (
                    <CSSTransition
                        key={index}
                        timeout={SHORT_TIMEOUT}
                        classNames="TipsCollection"
                    >
                        <TipItem item={tips[key]} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
