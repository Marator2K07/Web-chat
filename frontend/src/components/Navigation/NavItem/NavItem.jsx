import React from 'react'
import classes from './NavItem.module.css'

export default function NavItem({root,
                                 description,   
                                 handleNavigate,
                                 index,
                                 setCurrentIndex,
                                 ...props}) {
    return (
        <div className={classes.NavItem} {...props}>
            <button onClick={() => {handleNavigate(root)
                                    setCurrentIndex(index)}}>
                {description}
            </button>            
        </div>
    )
}
