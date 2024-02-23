import React, { useState } from 'react'
import classes from './AccountImageButton.module.css'

function setMenuOffset(idBtn, idMenu) {
    const btnRect = document.getElementById(idBtn).getBoundingClientRect();
    const menuElem = document.getElementById(idMenu);
    menuElem.style.left = btnRect.left - 
                          menuElem.getBoundingClientRect().width +
                          btnRect.width + 10 + "px";    
}

export default function AccountImageButton({userImg, ...props}) {
    const [hov, setHov] = useState(false);

    return (
        <div className={classes.AccountImageButton} {...props}>
            <button id='btn' 
                onMouseEnter={() => {
                    setMenuOffset('btn', "miniMenu");
                    setHov(true);
                }}
                onMouseLeave={() => setHov(false)}>                
                <img src={userImg} alt="" />
                <p>&#10094;</p>
            </button>
        </div>
    )
}
