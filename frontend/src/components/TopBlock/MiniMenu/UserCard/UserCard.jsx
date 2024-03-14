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
                <p>Test Testovianni</p>
            </div>            
        </div>
    )
}