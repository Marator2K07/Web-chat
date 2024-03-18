import React from 'react'
import classes from './ResponseError.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'
import { PINK_EBONY_COLOR } from '../../../constants';

export default function ResponseError({message, ...props}) {
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
                <p>
                    Сообщение: <br/><span style={{color: PINK_EBONY_COLOR}}>
                        {message.message}
                    </span>
                </p> 
            </div>
            <div className='info'>
                <p>
                    Детали: <br/><span style={{color: PINK_EBONY_COLOR}}>
                        {message.response.data.detail}
                        {message.response.data.message}
                    </span>
                </p> 
            </div>
            <button type="button" onClick={() => toggleHolding(false, 0)}>
                Вернуться
            </button>            
        </div>
    )
}
