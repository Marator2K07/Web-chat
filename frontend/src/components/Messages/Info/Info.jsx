import React from 'react'
import classes from './Info.module.css'

export default function Info({message, ...props}) {
    return (
        <div className={classes.Info} {...props}>
            <div className="main">Сообщение: {message.main}</div>
            if (message.addition) {
                <div className="addition">{message.addition}</div>
            }             
        </div>
    )
}
