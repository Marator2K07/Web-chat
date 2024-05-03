import React from 'react'
import classes from './UserItem.module.css'
import MiniButton from '../../../Helper/MiniButton/MiniButton';

export default function UserItem({user,
                                  aboutUser,
                                  button,
                                  ...props}) {
    // в случае если пользователь не установил картинку - ставим
    // картинку по умолчанию из файлов проекта
    const userImg = !aboutUser.image
                ? `${window.location.origin}/DefUserIcon.png`
                :  aboutUser.image

    return (
        <div className={classes.UserItem} {...props}>
            <img src={userImg} alt="Not found" />
            <div>
                <p>{aboutUser.name} {aboutUser.secondname}</p>
            </div>
            {
                button &&
                <MiniButton
                    button={button}
                    data={user} />                
            }            
        </div>
    )
}
