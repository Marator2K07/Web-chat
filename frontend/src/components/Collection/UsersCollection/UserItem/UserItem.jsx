import React from 'react'
import classes from './UserItem.module.css'

export default function UserItem({aboutUser,
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
                <p>{aboutUser.name}</p>
                <p>{aboutUser.secondname}</p>
            </div>
            {
                button &&
                <button type="button" onClick={(e) =>{
                    e.stopPropagation(); // событие нажатия дальше не пойдет
                    button.action(user);
                }}>
                    {button.name}
                </button>
            }            
        </div>
    )
}
