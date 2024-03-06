import React from 'react'
import classes from './Info.module.css'

export default function Info({message, ...props}) {
    return (
        <div className={classes.Info} {...props}>
            <div className="main">Сообщение:</div>
            <p>{message.main}</p>
            {message.addition ? <div className="addition">Дополнительная информация:</div>  : ''} 
            <p>{message.addition}</p>
        </div>
    )
}
