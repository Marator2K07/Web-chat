import React from 'react'
import classes from './NewsMainBlock.module.css'
import MessagesBlock from '../../../MessagesBlock/MessagesBlock'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider'

export default function NewsMainBlock({...props}) {
    const { roomForNews } = useUserContext();

    return (
        <div className={classes.NewsMainBlock} {...props}>            
            <MessagesBlock room={roomForNews}/>
        </div>
    )
}
