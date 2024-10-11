import React from 'react'
import classes from './GettingStartedMainBlock.module.css'
import Scrollable from '../../../Helper/Scrollable/Scrollable'

export default function GettingStartedMainBlock({...props}) {
    return (
        <div className={classes.GettingStartedMainBlock} {...props}>
            <Scrollable>
                <h2>Начало работы</h2>
                <p>
                    Данное приложение находится в разработке и предназначено только
                    для учебных и ознакомительных целей. Оно может содержать ошибки
                    и не предназначено для коммерческого использования. 
                </p>
                <p>
                    Все основные положения о данном проекте изложены
                    в соотвествующем разделе - "О приложении", который находится
                    в контекстном меню по кнопке в правом верхнем углу. 
                </p>
            </Scrollable>
        </div>
    )
}
