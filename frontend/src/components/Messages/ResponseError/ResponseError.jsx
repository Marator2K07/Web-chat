import React from 'react'
import classes from './ResponseError.module.css'

export default function ResponseError({message, setLoading, ...props}) {
    return (
        <div className={classes.ResponseError} {...props}>
            <div className='name'>
                <p>Имя: <span style={{color:'#9c5858'}}>{message.name}</span></p> 
            </div>
            <div className='code'>
                <p>Код: <span style={{color:'#9c5858'}}>{message.code}</span></p> 
            </div>
            <div className='info'>
                <p>Сообщение: <span style={{color:'#9c5858'}}>{message.message}</span></p> 
            </div>
            <button type="button" onClick={() => setLoading(false)}>
                Вернуться
            </button>
        </div>
    )
}
