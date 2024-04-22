import React from 'react'
import classes from './UserCard.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider'

export default function UserCard({...props}) {
    const { aboutUser } = useUserContext();

    // в случае если пользователь не установил картинку - ставим
    // картинку по умолчанию из файлов проекта
    const userImg = !aboutUser || !aboutUser.image
        ? `${window.location.origin}/DefUserIcon.png`
        : aboutUser.image

    return (
        <div className={classes.UserCard} {...props}> 
            <div>
                <img src={userImg} alt="" />
            </div>           
            <div>
                <p>
                    {aboutUser
                        ? `${aboutUser.name}`
                        : 'Не авторизовано'}                        
                </p>
                <p>
                    {aboutUser
                        ? `${aboutUser.secondname
                            ? aboutUser.secondname
                            : 'без фамилии'}` 
                        : ''}                        
                </p>
            </div>            
        </div>
    )
}