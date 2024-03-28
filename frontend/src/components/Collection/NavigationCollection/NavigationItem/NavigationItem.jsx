import React from 'react'
import classes from './NavigationItem.module.css'
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';
import { saveLastMainBlock } from '../../../../contexts/CookieContext';

export default function NavigationItem({block, ...props}) {
    const {goNavigationWithAnimation} = useNavigationContext(); 

    return (
        <div className={classes.NavigationItem} {...props}>
            <button onClick={() => {
                saveLastMainBlock(block);
                goNavigationWithAnimation(block);                
                }}>
                {block.description}
            </button>            
        </div>
    )
}
