import React from 'react'
import classes from './NewsMainBlock.module.css'

export default function NewsMainBlock({...props}) {
    return (
        <div className={classes.NewsMainBlock} {...props}>
            NewsMainBlock
        </div>
    )
}
