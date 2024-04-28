import React from 'react'
import classes from './RoomItem.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';

export default function RoomItem({item, ...props}) {
    const { loadCurrentRoom } = useUserContext();    

    return (
        <div
            className={classes.RoomItem}
            onClick={() => {loadCurrentRoom(item)}} {...props}>
            <p>{item.name}</p>
        </div>
    )
}
