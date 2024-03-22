import React from 'react'
import classes from './RoomItem.module.css'

export default function RoomItem({room,
                                  ...props}) {
    return (
        <div className={classes.RoomItem} {...props}>
            <p>{room.name}</p>
        </div>
    )
}
