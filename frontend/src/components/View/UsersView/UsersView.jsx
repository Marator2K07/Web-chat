import React from 'react'
import classes from './UsersView.module.css'
import Loadable from '../../Helper/Loadable/Loadable'

export default function UsersView({ users, loading, ...props }) {

    if (users) {
        return (
            <div className={classes.UsersView} {...props}>

            </div>
        )
    } else {
        <Loadable
            isWorking={loading}
        />
    }

}
