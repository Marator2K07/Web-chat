import React from 'react'
import classes from './LoadingBlock.module.css'

export default function LoadingBlock({innerRef, loading, ...props}) {
    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>   
            {loading ? <img src='LoadingIcon.png' alt=''/> : <p/>}   
        </div>
    )
}
