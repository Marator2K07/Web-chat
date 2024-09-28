import React from 'react'
import classes from './ResponseError.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'
import { EXTRA_SHORT_DELAY } from '../../../constants';

export default function ResponseError({message, showErrorHandler, ...props}) {
    const { toggleHolding } = useLoadingContext();

    return (
        <div className={classes.ResponseError} {...props}>
            {/* <div className='name'>
                <p>
                    Имя: <br/><span style={{color: PINK_EBONY_COLOR}}>
                            {message.name}
                    </span>
                </p> 
            </div>
            <div className='code'>
                <p>
                    Код: <br/><span style={{color: PINK_EBONY_COLOR}}>
                        {message.code}
                    </span>
                </p> 
            </div> */}
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
            <button type="button" onClick={() => {
                toggleHolding(false)
                setTimeout(() => {
                    showErrorHandler()
                }, EXTRA_SHORT_DELAY)                
            }}>
                Вернуться
            </button>            
        </div>
    )
}
