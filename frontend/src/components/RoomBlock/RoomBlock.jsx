import React, { useState } from 'react'
import classes from './RoomBlock.module.css'
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { NEW_ROOM_ROUTE_END } from '../../constants';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import RoomsView from '../View/RoomsView/RoomsView';
import Scrollable from '../Helper/Scrollable/Scrollable';
import NewRoomForm from '../Form/NewRoomForm/NewRoomForm';
import { useLocation } from 'react-router-dom';

export default function RoomBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const [showRoomForm, setShowRoomForm] = useState(false);
    const location = useLocation();

    // данные, связанные с формой создания новой комнаты-чата
    const [newRoomForm, setNewRoomForm] = useState({
        selectedUsers: {},
        searchTag: 'name', // по умолчанию тег поиска стоит по имени
        roomName: ''
    });

    // добавление найденного пользователя в список чата комнаты
    const addSelectedUser = (user) => {
        const prevUsers = newRoomForm.selectedUsers;
        setNewRoomForm({
            selectedUsers: {
                [user.username]: user,
                ...prevUsers            
            }
        })        
    }

    // удаление уже добавленного пользователя из списка будущего чата
    const removeSelectedUser = (user) => {
        const prevUsers = newRoomForm.selectedUsers;
        let newSelected = { ...prevUsers }
        delete newSelected[user.username];
        setNewRoomForm({
            selectedUsers: newSelected
        });
    } 

    // дополнительные данные, для управления списком выбранных юзеров
    const [addUserButton] = useState({
        name: "+",
        action: addSelectedUser
    });
    const [removeUserButton] = useState({
        name: "-",
        action: removeSelectedUser
    });
    const [userHandlerButtons] = useState({
        addUserButton: addUserButton,
        removeUserButton: removeUserButton
    });         

    // установка изменений в имени комнаты для формы
    const handleRoomNameChange = async (e) => {	
        setNewRoomForm({
            selectedUsers: newRoomForm.selectedUsers,
            searchTag: newRoomForm.searchTag,
            roomName: e.target.value
        });
    } 

    // обработка нажатия на радио кнопку тэга поиска
    const handleSearchTagChange = async (e) => {
        setNewRoomForm({
            selectedUsers: newRoomForm.selectedUsers,
            searchTag: e.target.value,
            roomName: newRoomForm.roomName
        });
    }
    
    // обработка состояния с выводом нужного компонента 
    function handleAction() {
        setShowRoomForm(!showRoomForm);
    }
    
    // обработка формы...
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (showRoomForm) {
            startLoading();
            resetResult();
            await makePostRequest(
                location.pathname + NEW_ROOM_ROUTE_END,
                {
                    roomName: newRoomForm.roomName,
                    users: newRoomForm.selectedUsers
                }
            )
            stopLoading();
        }
        setShowRoomForm(!showRoomForm);       
    }    

    return (
        <div className={classes.RoomBlock} {...props}>
            <Scrollable>            
                <h3> {!showRoomForm ? 'Текущие чаты'
                                    : 'Создание нового чата'} 
                </h3>
                {
                    !showRoomForm 
                    ? <RoomsView handleAction={handleAction} />
                    : <NewRoomForm
                          formData={newRoomForm}
                          otherData={userHandlerButtons}
                          handleRoomNameChange={handleRoomNameChange}
                          handleSearchTagChange={handleSearchTagChange}
                          handleSubmit={handleSubmit}
                          handleCancel={handleAction} />
                }
            </Scrollable> 
        </div>
    )
}
