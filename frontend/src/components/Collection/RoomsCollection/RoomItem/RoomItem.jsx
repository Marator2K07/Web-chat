import React from 'react'
import classes from './RoomItem.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';
import MiniButton from '../../../Helper/MiniButton/MiniButton';

export default function RoomItem({item, button, ...props}) {
    const { loadCurrentRoom } = useUserContext();    

    return (
        <div
            className={classes.RoomItem}
            onClick={() => {loadCurrentRoom(item)}} {...props}>
            <p>{item.name}</p>
            {
                button &&
                <MiniButton
                    button={button}
                    data={item} />
            }
        </div>
    )
}
