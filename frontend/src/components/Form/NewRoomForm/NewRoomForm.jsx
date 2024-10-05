import React, { useState } from 'react'
import classes from './NewRoomForm.module.css'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout'
import { NEW_ROOM_FORM_NAME, USERS_SEARCH_ROUTE } from '../../../constants';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import UsersCollection from '../../Collection/UsersCollection/UsersCollection';
import RadioAsButton from '../../Helper/RadioAsButton/RadioAsButton';

export default function NewRoomForm({formData,
                                     otherData,
                                     handleChange,
                                     handleSubmit,
                                     handleCancel,
                                     ...props}) {
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const [searchTag, setSearchTag] = useState('name'); // по умолчанию тег поиска стоит по имени
    const [foundedUsers, setFoundedUsers] = useState({});    
    const [searchLine, setSearchLine] = useState('');

    // обработка изменений в поле поиска пользователей для добавления
    const handleSearch = async (e) => {
        setSearchLine(e.target.value);
        updateUsers();
    } 

    // обработка нажатия на радио кнопку тэга поиска
    const handleSearchTag = async (e) => {
        setSearchTag(e.target.value);
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
                <h4>Поиск по</h4>
                <RadioAsButton 
                    id='username' 
                    name='searchFilter'
                    value='username'
                    text='нику'
                    compairTag={searchTag} 
                    handleCompairTag={handleSearchTag} />
                <RadioAsButton 
                    id='name' 
                    name='searchFilter'
                    value='name'
                    text='имени'
                    compairTag={searchTag} 
                    handleCompairTag={handleSearchTag} />
                <RadioAsButton 
                    id='secondname' 
                    name='searchFilter'
                    value='secondname'
                    text='фамилии'
                    compairTag={searchTag} 
                    handleCompairTag={handleSearchTag} />                                
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
                        Создать
                    </button>
                    <button type='button' onClick={handleCancel}>
                        Отмена
                    </button>
                </HorizontalLayout>
            </form>
        </div>
    )
}
