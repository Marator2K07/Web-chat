import React from 'react'
import classes from './UserItem.module.css'

export default function UserItem({user,
                                  buttonName,
                                  buttonHandler,
                                  ...props}) {
    // в случае если пользователь не установил картинку - ставим
    // картинку по умолчанию из файлов проекта
    const userImg = !user.aboutUser.image ?
                    `${window.location.origin}/DefUserIcon.png` :
                    user.aboutUser.image

    return (
        <div className={classes.UserItem} {...props}>
            <img src={userImg} alt="Not found" />
            <div>
                <p>{`${user.aboutUser.name}`}</p>
                <p>{`${user.aboutUser.secondname}`}</p>
            </div>
            {
                buttonName &&
                <button type="button" onClick={buttonHandler}>
                    {buttonName}
                </button>
            }            
        </div>
    )
}
