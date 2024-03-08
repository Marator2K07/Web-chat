import React from 'react'
import classes from './NavItem.module.css'

export default function NavItem({root,
                                 description,   
                                 index,
                                 handleNavigate,                                 
                                 ...props}) {
    return (
        <div className={classes.NavItem} {...props}>
            <button onClick={() => handleNavigate(root)}>
                {description}
            </button>            
        </div>
    )
}
