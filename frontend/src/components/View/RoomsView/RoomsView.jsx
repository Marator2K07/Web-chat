import React from 'react'
import classes from './RoomsView.module.css'
import { useUserContext } from '../../../contexts/UserContext/UserProvider'
import { useLocation } from 'react-router-dom';
import RoomsCollection from '../../Collection/RoomsCollection/RoomsCollection';
import Loadable from '../../Helper/Loadable/Loadable';
import { cookies } from '../../../contexts/CookieContext';

export default function RoomsView({handleAction, ...props}) {
    const { rooms, loadRooms } = useUserContext();
    const location = useLocation();

    if (rooms) {
        return (
            <div className={classes.RoomsView} {...props}>
                <RoomsCollection items={rooms} />
                <button type="button" onClick={handleAction}>
                    Создать новый
                </button>
            </div>
        )
    } else {
        return (
            <Loadable
                isWorking={cookies.get('username')}
                propertyName={'rooms'}
                getDataUrl={`${location.pathname}/rooms`}
                setDataFunc={loadRooms} /> 
        )
    }
}
