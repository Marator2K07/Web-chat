import React from 'react'
import classes from './NavList.module.css'
import NavItem from '../NavItem/NavItem'

export default function NavList({currentRoot, ...props}) {
    // можно сразу здесь обьявить весь рутинг
    const data = {
        registerRoot: {path: '/register', description: 'Регистрация'},
        loginRoot: {path: '/login', description: 'Вход в аккаунт'}
    }

    return (
        <div className={classes.NavList} {...props}>
            { Object.keys(data).map(key => (
                <div key={key}>
                    <NavItem path={data[key].path}
                     description={data[key].description}/>
                </div>
            ))}
        </div>
    )
}
