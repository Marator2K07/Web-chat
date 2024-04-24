import React, { useState } from 'react'
import classes from './PersonalMainBlock.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { DATE_FORMAT, SHORT_DELAY, UPDATE_ABOUT_USER_ROUTE } from '../../../../constants';
import { cookies } from '../../../../contexts/CookieContext';
import { convertBlobToBase64, formParamIsEmpty } from '../../../../utils';
import AboutUserView from '../../../View/AboutUserView';
import dayjs from 'dayjs';

export default function PersonalMainBlock({...props}) {
    const { toggleHolding, startLoading, stopLoading } = useLoadingContext();	
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { aboutUser, loadAboutUser } = useUserContext();
    const [canBeChanged, setCanBeChanged] = useState(false);

    // данные для обновления, внесенные на форме 
    const [aboutUserFromForm, setAboutUserFromForm] = useState({
        id: aboutUser ? aboutUser.id : null,
        name: aboutUser ? aboutUser.name : null,
        secondname: aboutUser ? aboutUser.secondname : null,
        image: aboutUser ? aboutUser.image : null,
        dateOfBirth: aboutUser ? dayjs(aboutUser.dateOfBirth).format(DATE_FORMAT)
                               : null
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
            `${UPDATE_ABOUT_USER_ROUTE}/${cookies.get('username')}`,
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

    // обработка перехода к форме изменения данных
    function handleAction() {
        setCanBeChanged(!canBeChanged);
    }

    return (	
        <div className={classes.PersonalMainBlock} {...props}>
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
                <AboutUserView handleAction={handleAction} />
            }          
        </div>
	)              
}
