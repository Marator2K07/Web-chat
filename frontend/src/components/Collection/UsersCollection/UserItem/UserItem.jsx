import React from 'react'
import classes from './UserItem.module.css'
import MiniButton from '../../../Helper/MiniButton/MiniButton';
import Spacer from '../../../Helper/Spacer/Spacer';

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
            <Spacer sizeH='1px' sizeW='10px' />
            <img src={userImg} alt="Not found" />
            <Spacer sizeH='1px' sizeW='10px' />
            <div>
                <p>{aboutUser.name} {aboutUser.secondname}</p>
            </div>
            <Spacer sizeH='1px' sizeW='10px' />
            {
                button &&
                <MiniButton
                    button={button}
                    data={user} /> 
            } 
            <Spacer sizeH='1px' sizeW='10px' />
        </div>
    )
}
