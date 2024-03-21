import React from 'react'
import classes from './RoomItem.module.css'

export default function RoomItem(data, ...props) {

    return (
        <div className={classes.RoomItem} {...props}>
            <p>{data.data.name}</p>
        </div>
    )
}
