import React, { useState } from 'react'
import classes from './NewRoomForm.module.css'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout'
import { NEW_ROOM_FORM_NAME, USERS_SEARCH_ROUTE } from '../../../constants';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

export default function NewRoomForm({formData,
                                     otherData,
                                     handleChange,
                                     handleSubmit,
                                     handleCancel,
                                     ...props}) {
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const [foundedUsers, setFoundedUsers] = useState({});
    const [searchLine, setSearchLine] = useState('');

    // обработка изменений в поле поиска
    const handleSearch = async (e) => {
        setSearchLine(e.target.value);
        updateUsers();
    } 
    // подгрузка пользователей при поиске    
    const updateUsers = async() => {    
        resetResult();
        await makePostRequest(
            USERS_SEARCH_ROUTE,
            { searchLine: searchLine },
            (response) => {
                setFoundedUsers(response.data.users);
            }
        )
    }

    return (
        <div className={classes.NewRoomForm} {...props}>
            <form name={NEW_ROOM_FORM_NAME}>                
                {/*участок формы создания чата*/} 
                <h4>Название комнаты для общения:</h4>
                <input
                    type='text'
                    value={formData.newRoomName}
                    onChange={handleChange} />
                <h4>Участники:</h4>
                <UsersCollection
                    users={formData.selectedUsers}
                    clue={'...Нет никого кроме вас...'}
                    button={otherData.removeUserButton} />

                {/*встроенный участок поиска и добавления пользователей*/} 
                <h4>Поиск по имени и фамилии:</h4>
                <input
                    type='text'
                    value={searchLine}
                    onChange={handleSearch} />
                <h4>Результаты поиска:</h4>
                <UsersCollection
                    users={foundedUsers}                        
                    clue={'...Никого нет...'}
                    button={otherData.addUserButton} />

                <HorizontalLayout>
                    <button type='button' onClick={handleSubmit}>
                        Применить изменения
                    </button>
                    <button type='button' onClick={handleCancel}>
                        Назад
                    </button>
                </HorizontalLayout>
            </form>
        </div>
    )
}
