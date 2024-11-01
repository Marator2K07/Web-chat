import React from 'react'
import classes from './WelcomeMainBlock.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';

export default function WelcomeMainBlock({ ...props }) {
    const { user, aboutUser } = useUserContext();

    return (
        <div className={classes.WelcomeMainBlock} {...props}>
            <h2>Приветствуем {user.username} в нашем веб-чате</h2>
            {
                (() => {
                    if (aboutUser) {
                        if (!aboutUser.secondname ||
                            !aboutUser.image ||
                            !aboutUser.dateOfBirth) {
                            return <p>
                                Похоже, ваш аккаунт заполнен не полностью.
                                Это не обязательно, но советуем ввести оставшиеся данные
                                с помощью следующей вкладки "Личная страница".
                            </p>
                        } else {
                            return <p>Ваш аккаунт заполнен полностью, так держать.</p>
                        }
                    } else {
                        return <p>Информация о пользователе пока отсутствует</p>
                    }
                })()
            }
            <p>Другой информации для отображения пока нет или не предусмотрено.</p>
            <p>Соблюдайте правила и приятного общения.</p>
        </div>
    )
}
