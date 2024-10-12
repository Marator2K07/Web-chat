import React, { useEffect, useState } from 'react'
import classes from './PersonalMainBlock.module.css'
import { useUserContext } from '../../../../contexts/UserContext/UserProvider';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { DATE_FORMAT, UPDATE_ABOUT_USER_ROUTE_END } from '../../../../constants';
import { convertBlobToBase64 } from '../../../../utils';
import AboutUserView from '../../../View/AboutUserView/AboutUserView';
import dayjs from 'dayjs';
import UpdateAboutUserForm from '../../../Form/UpdateAboutUserForm/UpdateAboutUserForm';
import { useLocation } from 'react-router-dom';
import { validUpdateAboutUserForm } from './PersonalFormState';
import { useMainBlockAnimationContext } from '../../../../contexts/MainBlockAnimationContext/MainBlockAnimationProvider';

export default function PersonalMainBlock({...props}) {
    const { startLoading, stopLoading } = useLoadingContext();	
    const { resetResult, makePostRequest } = useResponseHandlerContext();
    const { shake } = useMainBlockAnimationContext();
    const { aboutUser, loadAboutUser } = useUserContext();    
    const [canBeChanged, setCanBeChanged] = useState(false);
    const location = useLocation();

    // данные для обновления, внесенные на форме 
    const [aboutUserFromForm, setAboutUserFromForm] = useState();	

    // автообновление данных при изменении информации о пользователе
    useEffect(() => {
        setAboutUserFromForm({
            id: aboutUser ? aboutUser.id : "",
            name: aboutUser ? aboutUser.name : "",
            secondname: aboutUser ? aboutUser.secondname : "",
            image: aboutUser ? aboutUser.image : null,
            dateOfBirth: aboutUser ? dayjs(aboutUser.dateOfBirth).format(DATE_FORMAT)
                                   : "" 
        })
    }, [aboutUser]);

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
        if (!validUpdateAboutUserForm(shake)) {
            return;
        }

        // основная часть
        startLoading();
        resetResult();
        await makePostRequest(
            location.pathname + UPDATE_ABOUT_USER_ROUTE_END,
            aboutUserFromForm,
            () => {
                loadAboutUser(aboutUserFromForm);
                setCanBeChanged(!canBeChanged);
            }
        );
        stopLoading();
    } 

    // обработка состояния с выводом нужного компонента 
    function handleAction() {
        setCanBeChanged(!canBeChanged);
    }

    return (	
        <div className={classes.PersonalMainBlock} {...props}>
            { 
                canBeChanged ? 
                <UpdateAboutUserForm
                    formData={aboutUserFromForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleAction} />				
                : 				
                <AboutUserView handleAction={handleAction} />
            }              
        </div>
	)              
}
