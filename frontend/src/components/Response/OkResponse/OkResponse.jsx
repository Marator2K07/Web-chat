import React from 'react'
import styled from 'styled-components';
import classes from './OkResponse.module.css'
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';

export default function OkResponse({message, ...props}) {
    const { goNavigation } = useNavigationContext();
    const { toggleHolding } = useLoadingContext();
    const Buttons = styled.div`
    display: flex;
    align-self: center;
    `;   

    return (
        <div className={classes.OkResponse} {...props}>
            <div className='main'>
                Сообщение:
                <p>{message.main}</p>
                { 
                    message.addition &&
                    <div className='addition'>
                        Дополнительная информация:
                    </div>
                } 
                <p>{message.addition}</p>
            </div>  
            {
                message.holding &&
                <Buttons>
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
                </Buttons>
            }
        </div>
    )
}
