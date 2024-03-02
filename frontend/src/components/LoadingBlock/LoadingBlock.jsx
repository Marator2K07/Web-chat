import React from 'react'
import classes from './LoadingBlock.module.css'

export default function LoadingBlock({innerRef, ...props}) {
    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>
                            
        </div>
    )
}
