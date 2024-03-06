import React from 'react'
import classes from './OkResponse.module.css'

export default function OkResponse({message, ...props}) {
    return (
        <div className={classes.OkResponse} {...props}>
            <div className='main'>Сообщение:</div>
            <p>{message.main}</p>
            {message.addition ? <div className='addition'>Дополнительная информация:</div>  : ''} 
            <p>{message.addition}</p>
        </div>
    )
}
