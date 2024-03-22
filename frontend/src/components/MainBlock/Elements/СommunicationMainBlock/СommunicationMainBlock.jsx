import React from 'react'
import classes from './СommunicationMainBlock.module.css'
import RoomBlock from '../../../RoomBlock/RoomBlock'

export default function СommunicationMainBlock({...props}) {

    return (
        <div className={classes.СommunicationMainBlock} {...props}>
            <RoomBlock/>
        </div>
    )
}
