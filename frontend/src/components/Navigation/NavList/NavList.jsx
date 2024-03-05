import React from 'react'
import classes from './NavList.module.css'
import NavItem from '../NavItem/NavItem'

export default function NavList({currentRoot, ...props}) {
    return (
        <div className={classes.NavList} {...props}>
            { Object.keys(data).map(key => (
                <div key={key}>
                    <NavItem path={data[key].path}
                     description={data[key].description}/>
                </div>
            ))}
        </div>
    )
}
