import React from 'react'
import classes from './AccountImageButton.module.css'

export default function AccountImageButton({userImg, ...props}) {
    return (
        <div className={classes.AccountImageButton} {...props}>
            <button>
                <img src={userImg} alt="" />
                <p>&#10094;</p>
            </button>
        </div>
    )
}
