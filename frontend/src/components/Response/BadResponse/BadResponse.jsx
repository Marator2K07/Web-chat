import React from 'react'
import classes from './BadResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'

export default function BadResponse({message, ...props}) {  
    const { toggleHolding } = useLoadingContext();
    
    if (!message.main) {
        return;
    }

    return (
        <div className={classes.BadResponse} {...props}>
            <div>
                {
                    message.main && 
                    <div>
                        <h4>Сообщение:</h4>
                        <p>{message.main}</p>
                    </div>
                }
                { 
                    message.addition &&
                    <div>
                        <h4>Дополнительная информация:</h4>
                        <p>{message.addition}</p>
                    </div>
                }                 
            </div> 
            {
                message.hasOwnProperty("holding") &&
                <button
                    type="button"
                    onClick={() => toggleHolding(false, 0)}>
                    Вернуться
                </button>
            }
        </div>        
    )
}
