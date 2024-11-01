import React from 'react'
import classes from './MenuCollection.module.css'
import MenuItem from './MenuItem/MenuItem'

export default function MenuCollection({ items, ...props }) {
    return (
        <div className={classes.MenuCollection} {...props}>
            {Object.keys(items).map((key) => (
                <MenuItem item={items[key]} />
            ))}
        </div>
    )
}
