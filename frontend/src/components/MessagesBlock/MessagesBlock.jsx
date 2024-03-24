import React, { useEffect, useState } from 'react'
import classes from './MessagesBlock.module.css'
import { useUserContext } from '../../contexts/UserContext/UserProvider'
import MessagesCollection from '../Collection/MessagesCollection/MessagesCollection';
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { GET_MESSAGES_FOR_ROOM_URL } from '../../constants';

export default function MessagesBlock({...props}) {
    const { resetResult, makeGetRequest } = useResponseHandlerContext();
    const { roomForNews } = useUserContext();
    const [messages, setMessages] = useState({});

    // подгрузка сообщений
    const updateMessages = async() => {
        resetResult();
        await makeGetRequest(
            `${GET_MESSAGES_FOR_ROOM_URL}/${roomForNews.id}`,
            (response) => {
                setMessages(response.data.messages);
                console.log(response.data.messages);
            }
        )
    }

    useEffect(() => {
        updateMessages();
    }, []);

    return (
        <div className={classes.MessagesBlock} {...props}>            
            {roomForNews.name}
            <MessagesCollection
                messages={messages}
                clue={'...Нет ни одного сообщения...'}/>
        </div>
    )
}
