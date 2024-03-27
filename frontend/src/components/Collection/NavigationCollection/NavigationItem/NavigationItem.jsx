import React from 'react'
import classes from './NavigationItem.module.css'
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';

export default function NavigationItem({route,
                                        description,                                 
                                        ...props}) {
    const { goNavigationWithAnimation } = useNavigationContext(); 

    return (
        <div className={classes.NavigationItem} {...props}>
            <button onClick={() => goNavigationWithAnimation(route)}>
                {description}
            </button>            
        </div>
    )
}
