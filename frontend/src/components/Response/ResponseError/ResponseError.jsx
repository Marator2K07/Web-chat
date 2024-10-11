import React from 'react'
import classes from './ResponseError.module.css';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'

export default function ResponseError({message, ...props}) {
    const { toggleHolding } = useLoadingContext();

    return (
        <div className={classes.ResponseError} {...props}>
            <div className='info'>
                <h4>Сообщение:</h4>
                <p>{message.message}</p> 
            </div>
            {
                message.hasOwnProperty("response") &&
                <div className='info'>
                    <h4>Детали:</h4>
                    <p>
                        {message.response.data.detail}<br/>
                        {message.response.data.message}
                    </p> 
                </div>
            }            
            <button type="button" onClick={() => toggleHolding(false)}>
                Вернуться
            </button>            
        </div>
    )
}
