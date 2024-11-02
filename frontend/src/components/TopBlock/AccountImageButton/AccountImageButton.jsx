import { React, useRef, useState } from 'react'
import classes from './AccountImageButton.module.css'
import MiniMenu from '../MiniMenu/MiniMenu';
import { CSSTransition } from 'react-transition-group';
import './AccountImageButtonCSSTransition.css';
import '../MiniMenu/MiniMenuCSSTransition.css';
import { MEDIUM_TIMEOUT } from '../../../constants';
import { setMenuOffset } from '../../../utils';

export default function AccountImageButton({ ...props }) {
    const [hov, setHov] = useState(false);
    const nodeRef = useRef(null);
    const anotherRef = useRef(null);

    return (
        <div
            className={classes.AccountImageButton}
            {...props}
            onMouseLeave={() => setHov(false)}
        >
            <CSSTransition
                in={hov}
                nodeRef={nodeRef}
                timeout={MEDIUM_TIMEOUT}
                className="AccountImageButton-init"
                classNames="AccountImageButton">
                <button ref={nodeRef} id='btn'
                    onMouseEnter={() => {
                        setHov(true);
                        setMenuOffset('btn', "miniMenu")
                    }}>
                    <img
                        src={`${window.location.origin}/DefUserIcon.png`}
                        alt=""
                    />
                    <p>&#10094;&#10094;</p>
                </button>
            </CSSTransition>
            
            <CSSTransition
                in={hov}
                nodeRef={anotherRef}
                timeout={MEDIUM_TIMEOUT}
                classNames="MiniMenu">
                <MiniMenu
                    innerRef={anotherRef}
                    id='miniMenu'
                />
            </CSSTransition>
        </div>
    )
}
