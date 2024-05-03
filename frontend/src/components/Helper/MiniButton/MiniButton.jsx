import React from 'react'
import classes from './MiniButton.module.css'

export default function MiniButton({button, ...props}) {
    return (
        <div className={classes.MiniButton} {...props}>
            <p onClick={(e) => {
                e.stopPropagation(); // событие нажатия дальше не пойдет
                button.action();
            }}>
                {button.name}
            </p> 
        </div>
    )
}
