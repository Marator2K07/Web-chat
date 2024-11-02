import React from 'react'
import classes from './AboutUserView.module.css'
import Loadable from '../../Helper/Loadable/Loadable'
import { useUserContext } from '../../../contexts/UserContext/UserProvider';
import { useLocation } from 'react-router-dom';
import { cookies } from '../../../contexts/CookieContext';
import { COOKIES_USERNAME, DATE_FORMAT } from '../../../constants';
import dayjs from 'dayjs';
import NameValueMiniBlock from '../../Helper/NameValueMiniBlock/NameValueMiniBlock';
import HorizontalLine from '../../Helper/HorizontalLine/HorizontalLine';
import VerticalLine from '../../Helper/VerticalLine/VerticalLine';

export default function AboutUserView({ handleAction, ...props }) {
    const { aboutUser, loadAboutUser } = useUserContext();
    const location = useLocation();

    if (aboutUser) {
        return (
            <div className={classes.AboutUserView} {...props}>
                <HorizontalLine>
                    {
                        !aboutUser.image
                            ? <img
                                src={`${window.location.origin}/DefUserIcon256.png`}
                                alt="Not found"
                            />
                            : <img
                                src={aboutUser.image}
                                alt="Not found"
                            />
                    }
                    <VerticalLine>
                        <NameValueMiniBlock
                            name='Имя:'
                            value={aboutUser.name
                                ? aboutUser.name
                                : 'Не задано'}
                        />

                        <NameValueMiniBlock
                            name='Фамилия:'
                            value={aboutUser.secondname
                                ? aboutUser.secondname
                                : 'Не задано'}
                        />

                        <NameValueMiniBlock
                            name='День рождения:'
                            value={aboutUser.dateOfBirth
                                ? dayjs(aboutUser.dateOfBirth)
                                    .format(DATE_FORMAT)
                                : 'Не задано'}
                        />
                        <button type="button" onClick={handleAction}>
                            Изменить
                        </button>
                    </VerticalLine>
                </HorizontalLine>
            </div>
        )
    } else {
        return (
            <Loadable
                isWorking={cookies.get(COOKIES_USERNAME)}
                propertyName={'aboutUser'}
                getDataUrl={`${location.pathname}/about`}
                setDataFunc={loadAboutUser}
            />
        )
    }
}
