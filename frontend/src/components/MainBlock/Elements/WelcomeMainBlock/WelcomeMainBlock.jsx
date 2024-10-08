import React from 'react'
import classes from './WelcomeMainBlock.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';
import Scrollable from '../../../Helper/Scrollable/Scrollable';

export default function WelcomeMainBlock({...props}) {
    const { aboutUser } = useUserContext();

    return (
        <div className={classes.WelcomeMainBlock} {...props}>
            <Scrollable>
                <h2>Приветствуем вас в нашем веб-чате</h2>
                {
                    (() => {
                        if (aboutUser) {
                            if (!aboutUser.secondname ||
                                !aboutUser.image ||
                                !aboutUser.dateOfBirth) {
                                return <p>
                                    Похоже ваш аккаунт заполнен не полностью.
                                    Это не обязательно, но советуем ввести оставшиеся данные.
                                </p>
                            } else {
                                return <p>Ваш аккаунт заполнен полностью, так держать.</p>
                            }
                        } else {
                            return <p>Информация о пользователе пока отсутствует</p>
                        }
                    })()
                }   
                <p>
                    Все основные положения о данном проекте изложены в соотвествующем разделе - "О приложении". 
                </p>
                <p>Соблюдайте правила и приятного общения.</p>
            </Scrollable>
        </div>
    )
}
