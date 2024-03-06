import React from 'react'
import classes from './BadResponse.module.css'

export default function BadResponse({message, setLoading, ...props}) {
    return (
        <div className={classes.BadResponse} {...props}>
            <div className='main'>Сообщение: {message.main}</div>
            <div className='addition'>Дополнительная информация: {message.addition}</div>
            <button type="button" onClick={() => setLoading(false)}>
                Вернуться
            </button>
        </div>        
    )
}
