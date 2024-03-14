import React from 'react'
import classes from './ResponseError.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'

export default function ResponseError({message, ...props}) {
    const { toggleHolding } = useLoadingContext();

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

            {message.hasOwnProperty("response") &&
            <div className='addition'>
                <p>Дополнительная информация: <br/><span style={{color:'#704949'}}>{
                    message.response.data.substring(
                        0, message.response.data.indexOf('(500 Internal Server Error)')
                    )
                }</span></p> 
            </div>}
             
            <button type="button" onClick={() => toggleHolding(false, 0)}>
                Вернуться
            </button>            
        </div>
    )
}
