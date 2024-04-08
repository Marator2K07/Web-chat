import React from 'react'
import classes from './OkResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout';

export default function OkResponse({message, ...props}) {
    const { goNavigation } = useNavigationContext();
    const { toggleHolding } = useLoadingContext();    

    return (
        <div className={classes.OkResponse} {...props}>
            <div className='main'>
                <h4>Сообщение:</h4>
                <p>{message.main}</p>
                { 
                    message.addition &&
                    <div className='addition'>
                        <h4>Дополнительная информация:</h4>
                        <p>{message.addition}</p>
                    </div>
                }                 
            </div>  
            {
                message.holding &&
                <HorizontalLayout>
                    <div>
                        <button 
                            type="button"
                            onClick={() => toggleHolding(false)}>
                            Вернуться
                        </button>
                    </div>
                    <div>
                        {message.hasOwnProperty("button") &&
                        <button
                            type="button"
                            onClick={() => {
                                toggleHolding(false);
                                goNavigation(message.button.key); 
                            }}>
                            {message.button.text}
                        </button>}
                    </div>
                </HorizontalLayout>
            }
        </div>
    )
}
