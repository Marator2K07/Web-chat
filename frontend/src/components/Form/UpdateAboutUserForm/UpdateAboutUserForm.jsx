import React, { useEffect, useRef, useState } from 'react'
import classes from './UpdateAboutUserForm.module.css'
import HorizontalLayout from '../../Helper/HorizontalLayout/HorizontalLayout'
import { EXTRA_SHORT_DELAY, UPDATE_ABOUT_USER_FORM_NAME } from '../../../constants'
import { useTipsContext } from '../../../contexts/TipsContext/TipsProvider';
import { tipForSecondname } from '../../MainBlock/Elements/PersonalMainBlock/PersonalFormState';

export default function UpdateAboutUserForm({formData,
                                             handleChange,
                                             handleSubmit,
                                             handleCancel,
                                             ...props}) {
    const inputSecondnameRef = useRef(null); 
    const { newTipsCoordinates, resetState } = useTipsContext();
    const { addTip, removeTip } = useTipsContext();
    const [secondnameInputFocus, setSecondnameInputFocus] = useState(false);
                      
    // простая подсказка для поля фамилии
    useEffect(() => {
        const timeout = setTimeout(() => {
            tipForSecondname(addTip, removeTip, secondnameInputFocus);      
        }, EXTRA_SHORT_DELAY);
        return () => clearTimeout(timeout)
    }, [addTip, removeTip, secondnameInputFocus]);

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
                    onFocus={() => {
                        newTipsCoordinates(inputSecondnameRef)
                        setSecondnameInputFocus(true) 
                    }}
                    onBlur={() => setSecondnameInputFocus(false)} />
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
