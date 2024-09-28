import React from 'react'
import classes from './BadResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout';

export default function BadResponse({message, error, showErrorHandler, ...props}) {  
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
                <HorizontalLayout>
                    {
                        error &&
                        <button 
                            type="button"
                            onClick={showErrorHandler}>
                            Показать ошибку
                        </button>
                    }                    
                    {
                        message.hasOwnProperty("holding") &&
                        <button
                            type="button"
                            onClick={() => toggleHolding(false, 0)}>
                            Вернуться
                        </button>
                    }                    
                </HorizontalLayout>                
            }
        </div>        
    )
}
