import React from 'react'
import classes from './GettingStartedMainBlock.module.css'

export default function GettingStartedMainBlock({ ...props }) {
    return (
        <div className={classes.GettingStartedMainBlock} {...props}>
            <h2>Начало работы</h2>
            <p>
                Данное приложение находится в стадии разработки и предназначено только
                для учебных и ознакомительных целей. Оно может содержать ошибки
                и не предназначено для коммерческого или любого другого серьезного использования.
            </p>
            <p>
                Все основные положения о данном проекте изложены
                в соотвествующем разделе - "О приложении", который находится
                в контекстном меню по кнопке в правом верхнем углу.
            </p>
        </div>
    )
}
