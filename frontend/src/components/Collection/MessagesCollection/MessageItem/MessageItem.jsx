import React from 'react'
import classes from './MessageItem.module.css'

export default function MessageItem({message, ...props}) {
    return (
        <div className={classes.MessageItem} {...props}>
            <p>{message.information}</p>
            <p>{message.information}</p>
        </div>
    )
}
