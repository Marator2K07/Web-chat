import React from 'react'
import classes from './UserCard.module.css'

export default function UserCard({aboutUser, ...props}) {
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