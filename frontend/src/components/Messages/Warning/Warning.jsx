import React from 'react'
import classes from './Warning.module.css'

export default function Warning(message, setLoading, ...props) {
    return (
        <div className={classes.Warning} {...props}>
            <div className='main'>Сообщение: {message.main}</div>
            <div className='addition'>Дополнительная информация: {message.addition}</div>
            <button type="button" onClick={() => setLoading(false)}>
                Вернуться
            </button>
        </div>        
    )
}
