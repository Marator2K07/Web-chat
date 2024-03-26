import React from 'react'
import classes from './СommunicationMainBlock.module.css'
import RoomBlock from '../../../RoomBlock/RoomBlock'
import MessagesBlock from '../../../MessagesBlock/MessagesBlock'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider'

export default function СommunicationMainBlock({...props}) {
    const { currentRoom } = useUserContext();

    return (
        <div className={classes.СommunicationMainBlock} {...props}>
            <RoomBlock/>
            <MessagesBlock room={currentRoom}/>
        </div>
    )
}
