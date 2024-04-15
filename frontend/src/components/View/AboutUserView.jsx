import React from 'react'
import classes from './AboutUserView.module.css'
import Loadable from '../Helper/Loadable/Loadable'
import { useUserContext } from '../../contexts/UserContext/UserProvider';
import { useLocation } from 'react-router-dom';

export default function AboutUserView({...props}) {
    const { aboutUser, loadAboutUser } = useUserContext();
    const location = useLocation();

    if (aboutUser) {
        return (
            <div className={classes.AboutUserView} {...props}>
                <h4>Фото аккаунта:</h4>
                {!aboutUser.image ? <img
                                      src={`${window.location.origin}/DefUserIcon.png`}
                                      alt="Not found" />
                                  : <img 
                                      src={aboutUser.image}
                                      alt="Not found" />}
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
    } else {
        return (
            <Loadable
                propertyName={'aboutUser'}
                getDataUrl={`${location.pathname}/about`}
                setDataFunc={loadAboutUser} />
        )
    }    
}
