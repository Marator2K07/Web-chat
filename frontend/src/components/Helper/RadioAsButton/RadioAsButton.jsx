import React from 'react'
import classes from './RadioAsButton.module.css'

export default function RadioAsButton({
    id,
    name,
    value,
    text,
    compairTag,
    handleCompairTag,
    ...props
}) {

    if (value === compairTag) {
        return (
            <div className={classes.RadioAsButton} {...props}>
                <input
                    id={id}
                    type='radio'
                    name={name}
                    value={value}
                    onChange={handleCompairTag}
                    defaultChecked
                />
                <label htmlFor={id}>
                    {text}
                </label>
            </div>
        )
    } else {
        return (
            <div className={classes.RadioAsButton}
                {...props}>
                <input
                    id={id}
                    type='radio'
                    name={name}
                    value={value}
                    onChange={handleCompairTag}
                />
                <label htmlFor={id}>
                    {text}
                </label>
            </div>
        )
    }
}
