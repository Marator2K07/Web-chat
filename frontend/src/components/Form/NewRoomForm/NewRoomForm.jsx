import React from 'react'
import classes from './NewRoomForm.module.css'

export default function NewRoomForm({formData,
                                     handleChange,
                                     handleSubmit,
                                     handleCancel,
                                     ...props}) {
    return (
        <div className={classes.NewRoomForm} {...props}>
            <form name='roomForm'>
                <h4>Название комнаты для общения:</h4>
                <input
                    type='text'
                    value={formData.name}
                    onChange={handleChange} />
                <h4>Участники:</h4>
                <UsersCollection
                    users={selectedUsers}
                    clue={'...Нет никого кроме вас...'}
                    buttonName={'---'}
                    buttonHandler={removeSelectedUser} />

                <h4>Поиск по имени и фамилии:</h4>
                <input
                    type='text'
                    value={searchStr}
                    onChange={handleSearch} />
                <h4>Результаты поиска:</h4>
                <UsersCollection
                    users={foundedUsers}                        
                    clue={'...Никого нет...'}
                    buttonName={'+++'}
                    buttonHandler={getSelectedUser} />
            </form>
        </div>
    )
}
