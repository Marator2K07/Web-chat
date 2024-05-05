import React, { useState } from 'react'
import classes from './RoomBlock.module.css'
import { useUserContext } from '../../contexts/UserContext/UserProvider'
import UsersCollection from '../Collection/UsersCollection/UsersCollection';
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { MEDIUM_DELAY, NEW_ROOM_ROUTE, USERS_SEARCH_ROUTE } from '../../constants';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import RoomsView from '../View/RoomsView/RoomsView';
import HorizontalLayout from '../Helper/HorizontalLayout/HorizontalLayout';
import Scrollable from '../Helper/Scrollable/Scrollable';
import NewRoomForm from '../Form/NewRoomForm/NewRoomForm';

export default function RoomBlock({...props}) {
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { user } = useUserContext();
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [foundedUsers, setFoundedUsers] = useState({});

    // данные, связанные с формой создания новой комнаты-чата
    const [selectedUsers, setSelectedUsers] = useState({});
    const [roomName, setRoomName] = useState('');
    const [newRoomForm] = useState({
        selectedUsers: selectedUsers,
        roomName: roomName
    });


    // установка изменений для формы
    const handleChange = async (e) => {	
        setRoomName(e.target.value); 
    }

    // обработка изменений в поле поиска
    const handleSearch = async (e) => {
        setSearchLine(e.target.value);
        updateUsers();
    } 

    // добавление найденного пользователя в список чата комнаты
    const addSelectedUser = (user) => {        
        setSelectedUsers({
            [user.username]: user,
            ...selectedUsers            
        })
    }

    // удаление уже добавленного пользователя из списка будущего чата
    const removeSelectedUser = (user) => {
        let newSelected = { ...selectedUsers }
        delete newSelected[user.username];
        setSelectedUsers(newSelected);
    }   
    
    // обработка состояния с выводом нужного компонента 
    function handleAction() {
        setShowRoomForm(!showRoomForm);
    }

    // подгрузка пользователей при поиске
    const updateUsers = async() => {    
        resetResult();
        await makePostRequest(
            USERS_SEARCH_ROUTE,
            { searchLine: searchLine },
            (response) => {
                setFoundedUsers(response.data.users);
                console.log(response.data.users);
            }
        )
    }

    const [addUserButton] = useState({
        name: "+",
        action: addSelectedUser
    });
    const [removeUserButton] = useState({
        name: "-",
        action: removeSelectedUser
    });
    
    // обработка формы...
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (showRoomForm) {
            console.log(roomName);
            console.log(user);
            console.log(selectedUsers);

            startLoading();
            resetResult();
            await makePostRequest(
                NEW_ROOM_ROUTE,
                {
                    roomName: roomName,
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

    return (
        <div className={classes.RoomBlock} {...props}>
            <Scrollable>            
                <h3> { !showRoomForm ? 'Текущие чаты'
                                     : 'Создание нового чата'} 
                </h3>
                {
                    !showRoomForm ?
                    <RoomsView handleAction={handleAction} />
                    :
                    <NewRoomForm
                        formData={newRoomForm} />
                }
            </Scrollable>            
        </div>
    )
}
