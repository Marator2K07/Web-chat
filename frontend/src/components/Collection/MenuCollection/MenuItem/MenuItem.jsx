import React from 'react'
import classes from './MenuItem.module.css'

export default function MenuItem({item, ...props}) {
    return (
        <div className={classes.UserItem} {...props}>
            <button type='button' onClick={item.action}>
                {item.text}
            </button>
        </div>
    )
}
