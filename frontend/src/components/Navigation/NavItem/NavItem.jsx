import React from 'react'
import classes from './NavItem.module.css'
import { Link } from 'react-router-dom'

export default function NavItem({path, description, ...props}) {
    return (
        <div className={classes.NavItem} {...props}>
            <Link to={path}>{description}</Link>
        </div>
    )
}
