import React from 'react'
import classes from './MiniButton.module.css'

export default function MiniButton({button, data, ...props}) {
    return (
        <div className={classes.MiniButton} {...props}>
            <p onClick={(e) => {
                e.stopPropagation(); // событие нажатия дальше не пойдет
                if (data) {
                    button.action(data);
                } else {
                    button.action();
                }                
            }}>
                {button.name}
            </p> 
        </div>
    )
}
