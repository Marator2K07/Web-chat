import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classes from './Clue.module.css'
import './ClueCSSTransition.css';

export default function Clue({tips, ...props}) {
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
                        timeout={444}
                        classNames="Clue">
                        <div key={key}>
                            <p>{tips[key]}</p>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
