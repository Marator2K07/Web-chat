import React from 'react'
import classes from './UserCard.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider'

export default function UserCard({...props}) {
    const { aboutUser } = useUserContext();

    return (
        <div className={classes.UserCard} {...props}> 
            <div className='picture'>
                <img src={`${window.location.origin}/DefUserIcon.png`} alt="" />
            </div>           
            <div className='info'>
                <p>
                    { aboutUser ? `${aboutUser.name}` : 'Не авторизовано'}                        
                </p>
                <p>
                    { aboutUser ? `${aboutUser.secondname ? aboutUser.secondname : 'без фамилии'}` 
                        : ''}                        
                </p>
            </div>            
        </div>
    )
}