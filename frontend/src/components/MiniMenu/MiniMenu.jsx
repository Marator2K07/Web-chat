import React from 'react'
import classes from './MiniMenu.module.css'

export default function MiniMenu({innerRef, ...props}) {    
    return (
        <div ref={innerRef} className={classes.MiniMenu} {...props}>
            
        </div>
    )
}
