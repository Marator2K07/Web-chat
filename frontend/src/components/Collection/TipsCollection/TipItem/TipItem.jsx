import React from 'react'
import classes from './TipItem.module.css';

export default function TipItem({ item, ...props }) {
    return (
        <div className={classes.TipItem} {...props}>
            <p>{item}</p>
        </div>
    )
}
