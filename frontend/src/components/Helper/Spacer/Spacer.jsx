import React from 'react'
import classes from './Spacer.module.css'

export default function Spacer({sizeW, sizeH, ...props}) {
    const componentSize = {
        width: sizeW,
        height: sizeH
    };
    
    return (
        <div className={classes.Spacer}
            style={componentSize}
            {...props}>            
        </div>
    )
}