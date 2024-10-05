import React from 'react'
import classes from './RadioAsButton.module.css'

export default function RadioAsButton({id,
                                       name, 
                                       value, 
                                       text, 
                                       ...props}) {
    return (
        <div className={classes.RadioAsButton} {...props}>
            <input id={id} type='radio' name={name} value={value} checked/>
            <label for={id}>{text}</label>
        </div>
    )
}
