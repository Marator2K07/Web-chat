import React, { useRef } from 'react'
import classes from './UpdateAboutUserForm.module.css'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout'
import { UPDATE_ABOUT_USER_FORM_NAME } from '../../../constants'
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';

export default function UpdateAboutUserForm({formData,
                                             handleChange,
                                             handleSubmit,
                                             handleCancel,
                                             ...props}) {
    const inputSecondnameRef = useRef(null); 
    const { newTipsCoordinates, resetState } = useTipsContext();
                            
    return (
        <div className={classes.UpdateAboutUserForm}
            onBlur={resetState}
            {...props}>
            <form name={UPDATE_ABOUT_USER_FORM_NAME}>
                <p>Имя:</p>
                <input
                    type='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange} />
                <p>Фамилия:</p>
                <input
                    ref={inputSecondnameRef}
                    type='text'
                    name='secondname'
                    value={formData.secondname}
                    onChange={handleChange}
                    onFocus={() => newTipsCoordinates(inputSecondnameRef)} />
                <p>Дата рождения:</p>
                <input
                    type='date'
                    name='dateOfBirth'
                    value={formData.dateOfBirth}
                    onChange={handleChange} />
                <p>Аватарка:</p>
                <input
                    type='file'
                    name='image'
                    onInput={handleChange} />
                <HorizontalLayout>
                    <button type='button' onClick={handleSubmit}>
                        Применить изменения
                    </button>
                    <button type='button' onClick={handleCancel}>
                        Назад
                    </button>
                </HorizontalLayout>                
            </form>	
        </div>
    )
}
