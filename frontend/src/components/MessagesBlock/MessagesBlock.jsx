import React, { useEffect, useState } from 'react'
import classes from './MessagesBlock.module.css'
import { useUserContext } from '../../contexts/UserContext/UserProvider'
import MessagesCollection from '../Collection/MessagesCollection/MessagesCollection';
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { GET_MESSAGES_FOR_ROOM_URL, MEDIUM_DELAY, NEW_MESSAGE_URL } from '../../constants';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import Scrollable from '../Collection/Scrollable/Scrollable';

export default function MessagesBlock({room, ...props}) { 
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();
    const {
        resetResult,
        makeGetRequest,
        makePostRequest
    } = useResponseHandlerContext();
    const { user } = useUserContext();
    const [messages, setMessages] = useState({});
    const [count, setCount] = useState();

    // для отслеживания нового сообщения
    const [newMessage, setNewMessage] = useState(''); 

    // установка изменений в идентификационных данных
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    }

    // обработка отправки сообщения
    const handleSend = async() => {
        console.log('SENDINNNNNNG');
        startLoading();
        resetResult();
        await makePostRequest(
            NEW_MESSAGE_URL,
            { 
                username: user.username,
                roomId: room.id,
                information: newMessage
            },
            (response) => {
                setMessages({
                    ...messages,
                    [count]: response.data.message
                });
                toggleHolding(false, MEDIUM_DELAY);
                setNewMessage(''); // при успешной отправке обнуляем сообщение
                setCount(count+1);
            },
            toggleHolding(false, MEDIUM_DELAY)
        )
        stopLoading();
    }

    // подгрузка сообщений
    const updateMessages = async() => {
        resetResult();
        await makeGetRequest(
            `${GET_MESSAGES_FOR_ROOM_URL}/${room.id}`,            
            (response) => {
                setMessages(response.data.messages);
                console.log(response.data.messages);
                setCount(response.data.messages.lenght)
            }
        )
    }

    useEffect(() => {
        if (room) {
            console.log(room);
            updateMessages();
        }        
    }, [room]);

    if (!room) {
        return;
    }

    return (
        <div className={classes.MessagesBlock} {...props}>            
            <h4>{room 
                ? room.name 
                : 'Не выбрано ни одной комнаты'}</h4>
            <Scrollable>
                <MessagesCollection
                    messages={messages}
                    clue={'...Нет ни одного сообщения...'}/>
            </Scrollable>                
            <input
                type='text'
                name='message'
                value={newMessage}
                onChange={handleChange}/>
            <button type='button' onClick={handleSend}>
                Поделиться
            </button>
        </div>
    )
}
