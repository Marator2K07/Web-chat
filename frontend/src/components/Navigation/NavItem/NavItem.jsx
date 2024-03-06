import React from 'react'
import classes from './NavItem.module.css'

export default function NavItem({path,
                                 description,
                                 handleNavigate,
                                 ...props}) {
    return (
        <div className={classes.NavItem} {...props}>
            <button onClick={() => handleNavigate(path, description)}>
                {description}
            </button>            
        </div>
    )
}
