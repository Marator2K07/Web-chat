import React from 'react'
import classes from './BadResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider'
import { EXTRA_LONG_DELAY } from '../../../constants';
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';

export default function BadResponse({message, ...props}) {  
    const { navigationBlocks, goNavigation } = useNavigationContext();
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
                <HorizontalLayout>                                       
                    {
                        message.button &&
                        <button
                            type="button"
                            onClick={() => {
                                toggleHolding(false);
                                goNavigation(
                                    navigationBlocks[message.button.key]
                                ); 
                            }}>
                            {message.button.text}
                        </button>
                    }
                    {
                        !message.closeTab &&
                        <button type="button" onClick={
                            () => toggleHolding(false)
                            }>
                            Вернуться
                        </button>
                    } 
                </HorizontalLayout>
            }
        </div>        
    )
}
