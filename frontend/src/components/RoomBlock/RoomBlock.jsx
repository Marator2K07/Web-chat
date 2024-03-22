import React, { useState } from 'react'
import classes from './RoomBlock.module.css'
import { useUserContext } from '../../contexts/UserContext/UserProvider'
import RoomsCollection from '../Collection/RoomsCollection/RoomsCollection';
import UsersCollection from '../Collection/UsersCollection/UsersCollection';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { USERS_SEARCH_URL } from '../../constants';

export default function RoomBlock({...props}) {
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { rooms } = useUserContext();
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [foundedUsers, setFoundedUsers] = useState({});
    const [selectedUsers, setSelectedUsers] = useState({});
    const [searchStr, setSearchStr] = useState('');

    // привязанные к чату пользователи
    const [usersId, setUsersId] = useState({});
    // данные для создания новой комнаты чата, внесенные на форме
    const [roomFromForm, setRoomFromForm] = useState({
        name: '',
        dialog: true,
        users: usersId        
    });

    // установка изменений с формы
    const handleChange = async (e) => {	
        setRoomFromForm({
            ...roomFromForm,
            [e.target.name]: e.target.value			
        }); 
    }

    // обработка формы...
    async function handleSubmit(e) {
        setShowRoomForm(!showRoomForm);
    }

    const handleSearch = async (e) => {
        setSearchStr(e.target.value);
        updateUsers();
    }
    
    const updateUsers = async() => {    
        resetResult();
        await makePostRequest(
            USERS_SEARCH_URL,
            { searchStr: searchStr },
            (response) => {
                setFoundedUsers(response.data.users);
                console.log(response.data.users);
            }
        )
    }

    return (
        <div className={classes.RoomBlock} {...props}>
            <h3> { !showRoomForm ? 'Текущие чаты'
                                 : 'Создание нового чата'} 
            </h3>
            {
                !showRoomForm ?
                <RoomsCollection rooms={rooms}/>
                :
                <div>
                    <h4>Участники:</h4>
                    <UsersCollection
                        users={selectedUsers}
                        clue={'...Нет никого кроме вас...'}/>
                    <form name='roomForm'>
                        <h4>Поиск по имени и фамилии:</h4>
                        <input
                            type='text'
                            value={searchStr}
                            onChange={handleSearch}/>
                        <h4>Результаты поиска:</h4>
                        <UsersCollection
                            users={foundedUsers}
                            clue={'...Никого нет...'}/>
                    </form>
                    
                    
                </div>
            }

            
            <button type="button" onClick={handleSubmit}>
                { !showRoomForm ? 'Создать новый'
                                : 'Принять'}
            </button>
        </div>
    )
}
