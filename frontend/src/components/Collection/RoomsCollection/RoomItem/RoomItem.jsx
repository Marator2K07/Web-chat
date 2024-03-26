import React, { useState } from 'react'
import classes from './RoomItem.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';

export default function RoomItem({room,
                                  ...props}) {
    const { loadCurrentRoom } = useUserContext();    

    return (
        <div
            className={classes.RoomItem}
            onClick={() => {loadCurrentRoom(room)}} {...props}>
            <p>{room.name}</p>
        </div>
    )
}
