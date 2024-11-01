import React from 'react'
import classes from './NavigationItem.module.css'
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';

export default function NavigationItem({ block, ...props }) {
    const { goNavigationWithAnimation } = useNavigationContext();

    return (
        <div className={classes.NavigationItem} {...props}>
            <button onClick={() => goNavigationWithAnimation(block)}>
                {block.description}
            </button>
        </div>
    )
}
