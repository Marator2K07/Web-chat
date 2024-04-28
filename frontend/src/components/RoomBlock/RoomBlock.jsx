import React, { useState } from 'react'
import classes from './RoomBlock.module.css'
import { useUserContext } from '../../contexts/UserContext/UserProvider'
import UsersCollection from '../Collection/UsersCollection/UsersCollection';
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { MEDIUM_DELAY, NEW_ROOM_ROUTE, USERS_SEARCH_ROUTE } from '../../constants';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import RoomsView from '../View/RoomsView/RoomsView';

export default function RoomBlock({...props}) {
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { user } = useUserContext();
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [foundedUsers, setFoundedUsers] = useState({});
    const [selectedUsers, setSelectedUsers] = useState({});
    const [searchStr, setSearchStr] = useState('');

    // данные для создания новой комнаты чата, внесенные на форме
    const [newRoomName, setNewRoomName] = useState('');

    // установка изменений для формы
    const handleChange = async (e) => {	
        setNewRoomName(e.target.value); 
    }

    const getSelectedUser = (user) => {        
        setSelectedUsers({
            [user.username]: user,
            ...selectedUsers            
        })
    }

    const removeSelectedUser = (user) => {
        let newSelected = { ...selectedUsers }
        delete newSelected[user.username];
        setSelectedUsers(newSelected);
    } 

    // обработка изменений в поле поиска
    const handleSearch = async (e) => {
        setSearchStr(e.target.value);
        updateUsers();
    }    

    // подгрузка пользователей при поиске
    const updateUsers = async() => {    
        resetResult();
        await makePostRequest(
            USERS_SEARCH_ROUTE,
            { searchStr: searchStr },
            (response) => {
                setFoundedUsers(response.data.users);
                console.log(response.data.users);
            }
        )
    }
    
    // обработка формы...
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (showRoomForm) {
            console.log(newRoomName);
            console.log(user);
            console.log(selectedUsers);

            startLoading();
            resetResult();
            await makePostRequest(
                NEW_ROOM_ROUTE,
                {
                    roomName: newRoomName,
                    author: user,
                    users: selectedUsers 
                },
                toggleHolding(false, MEDIUM_DELAY),
                toggleHolding(false, MEDIUM_DELAY)
            )
            stopLoading();
        }        

        setShowRoomForm(!showRoomForm);       
    }

    // обработка состояния с выводом нужного компонента 
    function handleAction() {
        setShowRoomForm(!showRoomForm);
    }

    return (
        <div className={classes.RoomBlock} {...props}>
            <h3> { !showRoomForm ? 'Текущие чаты'
                                 : 'Создание нового чата'} 
            </h3>
            {
                !showRoomForm ?
                <RoomsView handleAction={handleAction} />
                :
                <form name='roomForm'>
                    <h4>Название комнаты для общения:</h4>
                    <input
                        type='text'
                        value={newRoomName.name}
                        onChange={handleChange}/>
                    <h4>Участники:</h4>
                    <UsersCollection
                        users={selectedUsers}
                        clue={'...Нет никого кроме вас...'}
                        buttonName={'---'}
                        buttonHandler={removeSelectedUser}/>

                    <h4>Поиск по имени и фамилии:</h4>
                    <input
                        type='text'
                        value={searchStr}
                        onChange={handleSearch}/>
                    <h4>Результаты поиска:</h4>
                    <UsersCollection
                        users={foundedUsers}                        
                        clue={'...Никого нет...'}
                        buttonName={'+++'}
                        buttonHandler={getSelectedUser}/>
                </form>
            }            
        </div>
    )
}
