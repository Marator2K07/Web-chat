import React from 'react'
import classes from './OtherUserMainBlock.module.css'
import { useNavigationContext } from '../../../../contexts/NavigationContext/NavigationProvider';
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';

export default function OtherUserMainBlock({...props}) {    
    const { goNavigation } = useNavigationContext(); 
    const { bufferUser } = useUserContext();
    
    return (
        <div className={classes.OtherUserMainBlock} {...props}>
            {
                bufferUser ? 
                <div>
                    <h4>Фото аккаунта:</h4>            
                    { !bufferUser.aboutUser.image 
                        ? <img
                            src={`${window.location.origin}/DefUserIcon.png`}
                            alt="Not found"/>
                        : <img 
                            src={bufferUser.aboutUser.image}
                            alt="Not found"/>						
                    }				
                    <h4>Имя:</h4>
                    <p>{bufferUser.aboutUser.name}</p>
                    <h4>Фамилия:</h4>
                    <p>{bufferUser.aboutUser.secondname}</p>
                    <h4>День рождения:</h4>
                    <p>{bufferUser.aboutUser.dateOfBirth}</p>
                    <div>
                        <input
                            type="checkbox"
                            id="subscribe"
                            name="subscribe"
                            onChange={onSubscribeChange}/>
                        <label for="subscribe">Подписаться на данного пользователя</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="bad_user"
                            name="bad_user"/>
                        <label for="bad_user">Содержится в черном списке</label>
                    </div>
                </div>
                :
                <p>...</p>
            }
        </div>
    )
}
