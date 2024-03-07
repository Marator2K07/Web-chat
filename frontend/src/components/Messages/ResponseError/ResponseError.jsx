import React from 'react'
import classes from './ResponseError.module.css'

export default function ResponseError({message, setLoading, ...props}) {
    return (
        <div className={classes.ResponseError} {...props}>
            <div className='name'>
                <p>Имя: <br/><span style={{color:'#704949'}}>{message.name}</span></p> 
            </div>
            <div className='code'>
                <p>Код: <br/><span style={{color:'#704949'}}>{message.code}</span></p> 
            </div>
            <div className='info'>
                <p>Сообщение: <br/><span style={{color:'#704949'}}>{message.message}</span></p> 
            </div>
            <button type="button" onClick={() => setLoading(false)}>
                Вернуться
            </button>
        </div>
    )
}
