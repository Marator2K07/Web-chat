import React from 'react'
import classes from './NameValueMiniBlock.module.css'

export default function NameValueMiniBlock({ name, value, ...props }) {
    return (
        <div className={classes.NameValueMiniBlock} {...props}>
            <h4>{name}</h4>
            <p>{value}</p>
        </div>
    )
}
