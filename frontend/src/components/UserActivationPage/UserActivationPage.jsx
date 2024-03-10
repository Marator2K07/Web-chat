import React from 'react'
import classes from './UserActivationPage.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock'

export default function UserActivationPage({...props}) {
    return (
        <div className={classes.UserActivationPage} {...props}>
            <LoadingBlock></LoadingBlock>
        </div>
    )
}
