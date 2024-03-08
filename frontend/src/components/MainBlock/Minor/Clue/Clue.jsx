import React from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './Clue.module.css'
import './ClueCSSTransition.css';

export default function Clue({tips, ...props}) {
    // если подсказок нет, то и отображать ничего не нужно
    if (!tips) {        
        return;
    } 

    return (
        <div className={classes.Clue} {...props}>
            {Object.keys(tips).map((key, index) => (
                <CSSTransition
                    key={index}
                    in={index <= Object.keys(tips).length}
                    timeout={444}
                    className="Clue-init"
                    classNames="Clue">
                    <div key={key}>
                        <p>{tips[key]}</p>
                    </div>
                </CSSTransition>
            ))}
        </div>
    )
}
