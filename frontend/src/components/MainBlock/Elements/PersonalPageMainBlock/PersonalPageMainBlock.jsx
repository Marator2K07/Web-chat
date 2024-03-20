import React, { useState } from 'react'
import classes from './PersonalPageMainBlock.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { SHORT_DELAY, UPDATE_ABOUT_USER_URL } from '../../../../constants';
import { cookies } from '../../../../contexts/CookieContext';
import { convertBlobToBase64, formParamIsEmpty } from '../../../../utils';

export default function PersonalPageMainBlock({...props}) {
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();	
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { aboutUser, loadAboutUser } = useUserContext();
    const [canBeChanged, setCanBeChanged] = useState(false);
    // данные для обновления, внесенные на форме 
    const [aboutUserFromForm, setAboutUserFromForm] = useState({
        id: aboutUser.id,
        name: aboutUser.name,
        secondname: aboutUser.secondname,
        image: aboutUser.image,
        dateOfBirth: aboutUser.dateOfBirth,
        lastActivityDatetime: aboutUser.lastActivityDatetime
	});
	
	// установка изменений с учетом картинки
    const handleChange = async (e) => {		
        var targetValue = e.target.name === "image"
            ? await convertBlobToBase64(e.target.files[0])
            : e.target.value;		
        setAboutUserFromForm({
            ...aboutUserFromForm,
            [e.target.name]: targetValue			
        }); 
    }

    // обработка формы
    async function handleSubmit(e) {
        e.preventDefault();
        // предпроверка перед отправкой запроса
        if (!canBeChanged) {
            setCanBeChanged(!canBeChanged);
            return;
        } else {
            let nameOk = !formParamIsEmpty('updateAboutUserForm', 'name');
            if (!nameOk) {				
                return;
            }
        }
        // основная часть
        startLoading();
        resetResult();
        await makePostRequest(
            `${UPDATE_ABOUT_USER_URL}/${cookies.get('username')}`,
            aboutUserFromForm,
            () => {
                // если все прошло хорошо, то обновляем и текущие данные
                loadAboutUser(aboutUserFromForm);
                toggleHolding(false, SHORT_DELAY);
                setCanBeChanged(!canBeChanged);
            }
        );
        stopLoading();
    } 

    return (	
        <div className={classes.PersonalPageMainBlock} {...props}>
            {
                canBeChanged ? 
                <form name='updateAboutUserForm'>
                <p>Имя:</p>
                <input
                    type='name'
                    name='name'
                    value={aboutUserFromForm.name}
                    onChange={handleChange}/>
                <p>Фамилия:</p>
                <input
                    type='text'
                    name='secondname'
                    value={aboutUserFromForm.secondname}
                    onChange={handleChange}/>
                <p>Дата рождения:</p>
                <input
                    type='date'
                    name='dateOfBirth'
                    value={aboutUserFromForm.dateOfBirth}
                    onChange={handleChange}/>
                <p>Аватарка:</p>
                <input
                    type='file'
                    name='image'
                    onInput={handleChange}/>
                </form>				
                : 				
                <div>
                    <h4>Фото аккаунта:</h4>
                    { !aboutUser.image ? <img
                                         src={`${window.location.origin}/DefUserIcon.png`}
                                         alt="Not found"/>
                                       : <img 
                                         src={aboutUser.image}
                                         alt="Not found"/>						
                    }				
                    <h4>Имя:</h4>
                    <p>{aboutUser.name}</p>
                    <h4>Фамилия:</h4>
                    <p>{aboutUser.secondname ? aboutUser.secondname : 'Не задано'}</p>
                    <h4>День рождения:</h4>
                    <p>{aboutUser.dateOfBirth ? aboutUser.dateOfBirth : 'Не задано'}</p>
                </div>
            }
            <button type="button" onClick={handleSubmit}>
                { !canBeChanged ? 'Сохранить изменения'
                                : 'Изменить данные'}
            </button>		
        </div>
	)              
}
