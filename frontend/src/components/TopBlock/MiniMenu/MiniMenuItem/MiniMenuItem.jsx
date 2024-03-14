import React from 'react'
import classes from './MiniMenuItem.module.css'

export default function MiniMenuItem({url,
                                      info,
                                      route,
                                      extraRoute,                                      
                                      ...props}) {
    return (
        <div className={classes.MiniMenuItem} {...props}>
            <button type="button">
                { info }
            </button>
        </div>
    )
}
