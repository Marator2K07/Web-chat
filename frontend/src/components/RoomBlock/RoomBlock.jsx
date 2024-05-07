import React, { useState } from 'react'
import classes from './RoomBlock.module.css'
import { useUserContext } from '../../contexts/UserContext/UserProvider'
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { MEDIUM_DELAY, NEW_ROOM_ROUTE } from '../../constants';
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider';
import RoomsView from '../View/RoomsView/RoomsView';
import Scrollable from '../Helper/Scrollable/Scrollable';
import NewRoomForm from '../Form/NewRoomForm/NewRoomForm';

export default function RoomBlock({...props}) {
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { user } = useUserContext();
    const [showRoomForm, setShowRoomForm] = useState(false);

    // данные, связанные с формой создания новой комнаты-чата
    const [newRoomForm, setNewRoomForm] = useState({
        selectedUsers: {},
        roomName: ''
    });

    // добавление найденного пользователя в список чата комнаты
    const addSelectedUser = (user) => {
        const prevUsers = newRoomForm.selectedUsers;
        setNewRoomForm({
            selectedUsers: {
                [user.username]: user,
                ...prevUsers            
            },
            roomName: newRoomForm.roomName
        })        
    }
    // удаление уже добавленного пользователя из списка будущего чата
    const removeSelectedUser = (user) => {
        const prevUsers = newRoomForm.selectedUsers;
        let newSelected = { ...prevUsers }
        delete newSelected[user.username];
        setNewRoomForm({
            selectedUsers: newSelected,
            roomName: newRoomForm.roomName
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
    const handleChange = async (e) => {	
        setNewRoomForm({
            selectedUsers: newRoomForm.selectedUsers,
            roomName: e.target.value
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
            console.log(newRoomForm.roomName);            
            console.log(newRoomForm.selectedUsers);
            console.log(user);

            startLoading();
            resetResult();
            await makePostRequest(
                NEW_ROOM_ROUTE,
                {
                    roomName: newRoomForm.roomName,
                    users: newRoomForm.selectedUsers,
                    author: user
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
                        formData={newRoomForm}
                        otherData={userHandlerButtons}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleAction} />
                }
            </Scrollable>            
        </div>
    )
}
