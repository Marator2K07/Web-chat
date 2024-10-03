import React from 'react'
import classes from './BadResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'
import { EXTRA_LONG_DELAY } from '../../../constants';

export default function BadResponse({message, ...props}) {  
    const { toggleHolding } = useLoadingContext();
    
    if (!message.main) {
        return;
    }

    // обработка возможного закрытия вкладки
    if (message.closeTab) {
        setTimeout(() => {
            window.close();
        }, EXTRA_LONG_DELAY);
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
                message.holding &&
                !message.closeTab &&
                <button type="button" onClick={
                    () => toggleHolding(false, 0)
                    }>
                    Вернуться
                </button>
            }
        </div>        
    )
}
