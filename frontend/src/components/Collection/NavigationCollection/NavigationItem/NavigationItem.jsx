import React from 'react'
import classes from './NavigationItem.module.css'
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';

export default function NavigationItem({root,
                                        description,                                 
                                        ...props}) {
    const { goNavigationWithAnimation } = useNavigationContext(); 

    return (
        <div className={classes.NavigationItem} {...props}>
            <button onClick={() => goNavigationWithAnimation(root)}>
                {description}
            </button>            
        </div>
    )
}
