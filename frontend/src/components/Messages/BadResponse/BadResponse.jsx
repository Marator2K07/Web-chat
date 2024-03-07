import React from 'react'
import classes from './BadResponse.module.css'

export default function BadResponse({message, setLoading, ...props}) {
    return (
        <div className={classes.BadResponse} {...props}>
            <div className='main'>
                <p>Сообщение: <br/><span style={{color:'#665d09'}}>{message.main}</span></p> 
            </div>            
            <div className='addition'>
                <p>Дополнительная информация: <br/><span style={{color:'#665d09'}}>{message.addition}</span></p> 
            </div>
            <button type="button" onClick={() => setLoading(false)}>
                Вернуться
            </button>
        </div>        
    )
}
