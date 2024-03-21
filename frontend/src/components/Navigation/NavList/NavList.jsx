import React from 'react'
import classes from './NavList.module.css'
import NavItem from '../NavItem/NavItem'
import { CSSTransition } from 'react-transition-group';
import './NavListCSSTransition.css';
import { SHORT_TIMEOUT } from '../../../constants';

export default function NavList({handleNavigate,
                                 blocksData,
                                 currentIndex,
                                 ...props}) {
    return (
        <div className={classes.NavList} {...props}>
            {Object.keys(blocksData).map((key, index) => (
                <CSSTransition 
                    key={index}
                    in={currentIndex !== index}
                    timeout={SHORT_TIMEOUT}
                    classNames="NavList">
                    <div key={key}>
                        <NavItem 
                            root={key}
                            description={blocksData[key].description}
                            index={index}
                            handleNavigate={handleNavigate}/>
                    </div>
                </CSSTransition>
            ))}
        </div>
    )
}
