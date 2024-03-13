import React from 'react'
import classes from './MiniMenu.module.css'

const loginUrl = '/logout';
const getTokensUrl = '/api/token/invalidate';

export default function MiniMenu({innerRef, ...props}) { 
    const items = {

    }
    
    return (
        <div ref={innerRef} className={classes.MiniMenu} {...props}>
            
        </div>
    )
}
