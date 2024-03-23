import React from 'react'
import classes from './NavList.module.css'
import NavItem from '../NavItem/NavItem'
import { CSSTransition } from 'react-transition-group';
import './NavListCSSTransition.css';
import { SHORT_TIMEOUT } from '../../../constants';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';

export default function NavList({currentIndex,
                                 minIndex,
                                 maxIndex,
                                 ...props}) {
    const { blocksData } = useNavigationContext();

    return (
        <div className={classes.NavList} {...props}>
            {Object.keys(blocksData)
                .slice(minIndex, maxIndex)
                .map((key, index) => (
                <CSSTransition 
                    key={index}
                    in={currentIndex !== blocksData[key].index}
                    timeout={SHORT_TIMEOUT}
                    classNames="NavList">
                    <NavItem 
                        root={key}
                        description={blocksData[key].description}/>
                </CSSTransition>
            ))}
        </div>
    )
}
