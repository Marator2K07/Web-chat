import React from 'react'
import classes from './MenuItem.module.css'

export default function MenuItem({item, ...props}) {
    return (
        <div className={classes.MenuItem} {...props}>
            <button type='button' onClick={item.action}>
                {item.info}
            </button>
        </div>
    )
}
