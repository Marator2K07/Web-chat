import React from 'react'
import classes from './AboutUserView.module.css'

export default function AboutUserView({ aboutUser, ...props }) {
    return (
        <div className={classes.AboutUserView} {...props}>
            <h4>Фото аккаунта:</h4>
            {!aboutUser.image ? <img
                                  src={`${window.location.origin}/DefUserIcon.png`}
                                  alt="Not found"/>
                              : <img 
                                  src={aboutUser.image}
                                  alt="Not found"/>}
            <h4>Имя:</h4>
            <p>{aboutUser.name}</p>
            <h4>Фамилия:</h4>
            <p>
                {aboutUser.secondname ? aboutUser.secondname
                                      : 'Не задано'}
            </p>
            <h4>День рождения:</h4>
            <p>
                {aboutUser.dateOfBirth ? aboutUser.dateOfBirth
                                       : 'Не задано'}
            </p>
        </div>
    )
}
