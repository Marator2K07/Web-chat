import React, { useEffect, useState } from 'react'
import classes from './NavList.module.css'
import NavItem from '../NavItem/NavItem'
import { CSSTransition } from 'react-transition-group';
import './NavListCSSTransition.css';

export default function NavList({handleNavigate, ...props}) {
    const [currentIndex, setCurrentIndex] = useState(null);    
    // можно сразу здесь обьявить весь рутинг
    const data = {
        loginRoot: {path: 'login', description: 'Вход в аккаунт'},
        registerRoot: {path: 'register', description: 'Регистрация'}
    }

    useEffect(() => {
        setCurrentIndex(0);
    }, []);

    return (
        <div className={classes.NavList} {...props}>
            {Object.keys(data).map((key, index) => (
                <CSSTransition 
                    key={index}
                    in={currentIndex !== index}
                    timeout={333}
                    classNames="NavList">
                    <div key={key}>
                        <NavItem 
                            path={data[key].path}
                            description={data[key].description}
                            index={index}
                            handleNavigate={handleNavigate}
                            setCurrentIndex={setCurrentIndex}/>
                    </div>
                </CSSTransition>
            ))}
        </div>
    )
}
