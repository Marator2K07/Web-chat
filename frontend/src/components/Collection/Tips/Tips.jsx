import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classes from './Tips.module.css'
import './TipsCSSTransition.css';
import { SHORT_TIMEOUT } from '../../../constants';

export default function Tips({tips, ...props}) {
    // если подсказок нет, то и отображать ничего не нужно
    if (!tips) {        
        return;
    } 

    return (
        <div className={classes.Clue} {...props}>
            <TransitionGroup>
                {Object.keys(tips).map((key, index) => (
                    <CSSTransition
                        key={index}
                        timeout={SHORT_TIMEOUT}
                        classNames="Tips">
                        <div key={key}>
                            <p>{tips[key]}</p>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
