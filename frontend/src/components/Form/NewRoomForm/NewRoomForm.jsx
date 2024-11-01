import React, { useEffect, useRef, useState } from 'react'
import classes from './NewRoomForm.module.css'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout'
import { NEW_ROOM_FORM_NAME, USERS_SEARCH_ROUTE } from '../../../constants';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import UsersCollection from '../../Collection/UsersCollection/UsersCollection';
import RadioAsButton from '../../Helper/RadioAsButton/RadioAsButton';
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';
import { useUserContext } from '../../../contexts/UserContext/UserProvider';

export default function NewRoomForm({
    formData,
    otherData,
    handleRoomNameChange,
    handleSearchTagChange,
    handleSubmit,
    handleCancel,
    ...props
}) {
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const [foundedUsers, setFoundedUsers] = useState({});
    const [searchLine, setSearchLine] = useState('');
    const inputRoomNameRef = useRef(null);
    const { newTipsCoordinates, resetState } = useTipsContext();
    const { user } = useUserContext();

    // обработка изменений в поле поиска пользователей для добавления
    const handleSearch = async (e) => {
        setSearchLine(e.target.value);
        updateUsers();
    }

    // подгрузка пользователей при поиске    
    const updateUsers = async () => {
        resetResult();
        await makePostRequest(
            USERS_SEARCH_ROUTE, {
            thisUserId: user.id,
            searchTag: formData.searchTag,
            searchLine: searchLine
        },
            (response) => {
                setFoundedUsers(response.data.users);
            }
        )
    }

    // перезагрузка пользователей в случае смены тега поиска
    useEffect(() => {
        if (searchLine.length > 0) {
            updateUsers();
        }
        // eslint-disable-next-line
    }, [formData.searchTag])

    return (
        <div
            className={classes.NewRoomForm}
            onBlur={resetState}
            {...props}
        >
            <form name={NEW_ROOM_FORM_NAME}>
                {/*участок формы создания чата*/}
                <h4>Название комнаты:</h4>
                <input
                    ref={inputRoomNameRef}
                    type='text'
                    name='roomName'
                    value={formData.newRoomName}
                    onChange={handleRoomNameChange}
                    onFocus={() => newTipsCoordinates(inputRoomNameRef)}
                />

                <h4>Участники:</h4>
                <UsersCollection
                    users={formData.selectedUsers}
                    clue={'...Пока только вы...'}
                    button={otherData.removeUserButton}
                />

                {/*встроенный участок поиска и добавления пользователей*/}
                <h4>Поиск по</h4>
                <RadioAsButton
                    id='username'
                    name='searchFilter'
                    value='username'
                    text='нику'
                    compairTag={formData.searchTag}
                    handleCompairTag={handleSearchTagChange}
                />
                <RadioAsButton
                    id='name'
                    name='searchFilter'
                    value='name'
                    text='имени'
                    compairTag={formData.searchTag}
                    handleCompairTag={handleSearchTagChange}
                />
                <RadioAsButton
                    id='secondname'
                    name='searchFilter'
                    value='secondname'
                    text='фамилии'
                    compairTag={formData.searchTag}
                    handleCompairTag={handleSearchTagChange}
                />

                <input
                    type='text'
                    value={searchLine}
                    onChange={handleSearch}
                />
                <h4>Результаты поиска:</h4>
                <UsersCollection
                    users={foundedUsers}
                    clue={'...Никого нет...'}
                    button={otherData.addUserButton}
                />

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
