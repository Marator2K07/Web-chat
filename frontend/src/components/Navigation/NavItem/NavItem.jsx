import React from 'react'
import classes from './NavItem.module.css'

export default function NavItem({path,
                                 description,
                                 handleNavigate,
                                 index,
                                 setCurrentIndex,
                                 ...props}) {
    return (
        <div className={classes.NavItem} {...props}>
            <button onClick={() => {handleNavigate(path, description)
                                    setCurrentIndex(index)}}>
                {description}
            </button>            
        </div>
    )
}
