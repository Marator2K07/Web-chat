import React from 'react'
import classes from './OkResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout';

export default function OkResponse({message, ...props}) {
    const { navigationBlocks, goNavigation } = useNavigationContext();
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
                    <button 
                        type="button"
                        onClick={() => toggleHolding(false)}>
                        Вернуться
                    </button>
                    {message.hasOwnProperty("button") &&
                    <button
                        type="button"
                        onClick={() => {
                            toggleHolding(false);
                            goNavigation(
                                navigationBlocks[message.button.key]
                            ); 
                        }}>
                        {message.button.text}
                    </button>}
                </HorizontalLayout>
            }
        </div>
    )
}
