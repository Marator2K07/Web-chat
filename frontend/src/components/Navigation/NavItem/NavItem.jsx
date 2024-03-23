import React from 'react'
import classes from './NavItem.module.css'
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider'

export default function NavItem({root,
                                 description,                                 
                                 ...props}) {
    const { goNavigationWithAnimation } = useNavigationContext(); 

    return (
        <div className={classes.NavItem} {...props}>
            <button onClick={() => goNavigationWithAnimation(root)}>
                {description}
            </button>            
        </div>
    )
}
