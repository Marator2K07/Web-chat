import React, { useState } from 'react'
import classes from './RoomsView.module.css'
import { useUserContext } from '../../../contexts/UserContext/UserProvider'
import { useLocation } from 'react-router-dom';
import RoomsCollection from '../../Collection/RoomsCollection/RoomsCollection';
import Loadable from '../../Helper/Loadable/Loadable';
import { cookies } from '../../../contexts/CookieContext';
import { useLoadingContext } from '../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { COOKIES_USERNAME, DELETE_ROOM_ROUTE_END } from '../../../constants';

export default function RoomsView({ handleAction, ...props }) {
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { startLoading, stopLoading } = useLoadingContext();
    const { rooms, loadRooms } = useUserContext();
    const location = useLocation();

    // запрос на удаление выбранной комнаты и связанная кнопка
    const removeSelectedRoom = async (selectedRoom) => {
        startLoading();
        resetResult();

        await makePostRequest(
            location.pathname + DELETE_ROOM_ROUTE_END,
            { room: selectedRoom },
            () => {
                // если все прошло успешно, то
                // убираем комнату из текущей коллекции фронтэнда
                const newRooms = rooms
                    .filter(room => room.id !== selectedRoom.id);
                loadRooms(newRooms);
            }
        )

        stopLoading();
    }
    const [removeRoomButton] = useState({
        name: "-",
        action: removeSelectedRoom
    });

    if (rooms) {
        return (
            <div className={classes.RoomsView} {...props}>
                <RoomsCollection
                    items={rooms}
                    button={removeRoomButton}
                />
                <button type="button" onClick={handleAction}>
                    Создать новый
                </button>
            </div>
        )
    } else {
        return (
            <Loadable
                isWorking={cookies.get(COOKIES_USERNAME)}
                propertyName={'rooms'}
                getDataUrl={`${location.pathname}/rooms`}
                setDataFunc={loadRooms}
            />
        )
    }
}
