import React from 'react'
import classes from './UserCard.module.css'

export default function UserCard({userInfo, ...props}) {
    return (
        <div className={classes.UserCard}>
            <div className='info'>
                <p>{userInfo.name} {userInfo.secondName}</p>
            </div>
            <div className='picture'>
                <img src="" alt="" />
            </div>
        </div>
    )
}