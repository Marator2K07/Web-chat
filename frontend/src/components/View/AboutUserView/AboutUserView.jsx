import React from 'react'
import classes from './AboutUserView.module.css'
import Loadable from '../../Helper/Loadable/Loadable'
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useLocation } from 'react-router-dom';
import { cookies } from '../../../contexts/CookieContext';
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../constants';

export default function AboutUserView({handleAction, ...props}) {
    const { aboutUser, loadAboutUser } = useUserContext();
    const location = useLocation();

    if (aboutUser) {
        return (
            <div className={classes.AboutUserView} {...props}>
                {
                    !aboutUser.image
                        ? <img
                            src={`${window.location.origin}/DefUserIcon256.png`}
                            alt="Not found" />
                        : <img 
                            src={aboutUser.image}
                            alt="Not found" />
                }
                <HorizontalLayout>
                    <div>                        
                        <h4>Имя:</h4>
                        <p>{aboutUser.name}</p>
                    </div>
                    <div>
                        <h4>Фамилия:</h4>
                        <p>{
                            aboutUser.secondname ? aboutUser.secondname
                                                 : 'Не задано'
                        }</p>
                    </div>                    
                </HorizontalLayout>
                <div>
                    <h4>День рождения:</h4>
                    <p>{
                        aboutUser.dateOfBirth ? dayjs(aboutUser.dateOfBirth)
                                                    .format(DATE_FORMAT)
                                              : 'Не задано'
                    }</p>  
                </div>                               
                <button type="button" onClick={handleAction}>
                    Изменить данные
                </button>  
            </div>
        )
    } else {
        return (
            <Loadable
                isWorking={cookies.get('username')}
                propertyName={'aboutUser'}
                getDataUrl={`${location.pathname}/about`}
                setDataFunc={loadAboutUser} />
        )
    }    
}
