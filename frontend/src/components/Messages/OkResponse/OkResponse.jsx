import React from 'react'
import styled from 'styled-components';
import classes from './OkResponse.module.css'

export default function OkResponse({message,
                                    setHolding,
                                    handleNavigate,
                                    ...props}) {
    const Buttons = styled.div`
    display: flex;
    align-self: center;
    `;   

    return (
        <div className={classes.OkResponse} {...props}>
            <div className='main'>
                Сообщение:
                <p>{message.main}</p>
                {message.addition ? <div className='addition'>Дополнительная информация:</div>  : ''} 
                <p>{message.addition}</p>
            </div>  

            {message.hasOwnProperty("holding") &&
            <Buttons>
                <div>
                    <button type="button" onClick={() => setHolding(false)}>
                        Вернуться
                    </button>
                </div>
                <div>
                    {message.hasOwnProperty("button") &&
                    <button type="button" onClick={() => {
                                setHolding(false);
                                handleNavigate(message.button.key); 
                            }
                        }>{message.button.text}
                    </button>}
                </div>
            </Buttons>}
        </div>
    )
}
