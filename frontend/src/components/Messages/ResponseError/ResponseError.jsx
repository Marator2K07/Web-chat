import React from 'react'
import classes from './ResponseError.module.css'

export default function ResponseError({message, handleLoading, ...props}) {
    return (
        <div className={classes.ResponseError} {...props}>
            <div className='name'>Имя: {message.name}</div>
            <div className='code'>Код: {message.code}</div>
            <div className='info'>Сообщение: {message.message}</div>
            <button type="button" onClick={handleLoading}>
                Вернуться
            </button>
        </div>
    )
}
