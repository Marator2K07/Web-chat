import { React, useRef, useState } from 'react'
import classes from './AccountImageButton.module.css'
import MiniMenu from '../MiniMenu/MiniMenu';
import { CSSTransition } from 'react-transition-group';
import './AccountImageButtonCSSTransition.css';
import '../MiniMenu/MiniMenuCSSTransition.css';

function setMenuOffset(idBtn, idMenu) {
    const btnRect = document.getElementById(idBtn).getBoundingClientRect();
    const menuElem = document.getElementById(idMenu);
    menuElem.style.left = btnRect.left - 
                          menuElem.getBoundingClientRect().width +
                          btnRect.width + 10 + "px";   
    menuElem.style.top = btnRect.top +                         
                         btnRect.height - 2 + "px";                          
}

export default function AccountImageButton({userImg, ...props}) {
    const [hov, setHov] = useState(false);
    const nodeRef = useRef(null);
    const anotherRef = useRef(null);
    
    return (
        <div className={classes.AccountImageButton} {...props}
        onMouseLeave={() => setHov(false)}>
            <CSSTransition 
                in={hov}
                nodeRef={nodeRef}
                timeout={500}
                className="AccountImageButton-init"
                classNames="AccountImageButton">
                <button ref={nodeRef} id='btn' 
                    onMouseEnter={() => {
                        setHov(true);                    
                        setMenuOffset('btn', "miniMenu")               
                    }}>                
                    <img src={userImg} alt="" />
                    <p>&#10094; &#10094; &#10094;</p>
                </button> 
            </CSSTransition>
            <CSSTransition
                in={hov}
                nodeRef={anotherRef}                               
                timeout={600}
                classNames="MiniMenu">
                <MiniMenu innerRef={anotherRef} id='miniMenu'/>  
            </CSSTransition>
        </div>
    )
}