import React from 'react'
import classes from './BadResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingContextProvider'

export default function BadResponse({message, ...props}) {  
    const { toggleHolding } = useLoadingContext();
    
    return (
        <div className={classes.BadResponse} {...props}>
            <div className='main'>
                <p>Сообщение: <br/><span style={{color:'#665d09'}}>{message.main}</span></p> 
            </div>            
            <div className='addition'>
                <p>Дополнительная информация: <br/><span style={{color:'#665d09'}}>{message.addition}</span></p> 
            </div>

            {message.hasOwnProperty("holding") &&
            <button type="button" onClick={() => toggleHolding(false, 0)}>
                Вернуться
            </button>}
        </div>        
    )
}
