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
                <h4>Имя:</h4>
                <input
                    type='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange} />
                <h4>Фамилия:</h4>
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
                <h4>Дата рождения:</h4>
                <input
                    type='date'
                    name='dateOfBirth'
                    value={formData.dateOfBirth}
                    onChange={handleChange} />
                <h4>Аватарка:</h4>
                <input
                    type='file'
                    name='image'
                    onInput={handleChange} />
                <HorizontalLayout>
                    <button type='button' onClick={handleSubmit}>
                        Применить
                    </button>
                    <button type='button' onClick={handleCancel}>
                        Назад
                    </button>
                </HorizontalLayout>                
            </form>	
        </div>
    )
}
