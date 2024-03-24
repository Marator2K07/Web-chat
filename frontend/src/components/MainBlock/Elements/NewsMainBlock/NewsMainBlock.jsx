import React from 'react'
import classes from './NewsMainBlock.module.css'
import MessagesBlock from '../../../MessagesBlock/MessagesBlock'

export default function NewsMainBlock({...props}) {
    return (
        <div className={classes.NewsMainBlock} {...props}>            
            <MessagesBlock/>
        </div>
    )
}
