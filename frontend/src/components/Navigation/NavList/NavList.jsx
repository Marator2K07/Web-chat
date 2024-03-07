import React, { useEffect, useState } from 'react'
import classes from './NavList.module.css'
import NavItem from '../NavItem/NavItem'
import { CSSTransition } from 'react-transition-group';
import './NavListCSSTransition.css';

export default function NavList({handleNavigate, pagesData, ...props}) {
    const [currentIndex, setCurrentIndex] = useState(null);    

    useEffect(() => {
        setCurrentIndex(0);
    }, []);

    return (
        <div className={classes.NavList} {...props}>
            {Object.keys(pagesData).map((key, index) => (
                <CSSTransition 
                    key={index}
                    in={currentIndex !== index}
                    timeout={333}
                    classNames="NavList">
                    <div key={key}>
                        <NavItem 
                            root={key}
                            description={pagesData[key].description}
                            index={index}
                            handleNavigate={handleNavigate}
                            setCurrentIndex={setCurrentIndex}/>
                    </div>
                </CSSTransition>
            ))}
        </div>
    )
}
