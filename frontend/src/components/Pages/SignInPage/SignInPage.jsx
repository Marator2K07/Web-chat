import React from 'react'
import classes from './SignInPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock'

export default function SignInPage({userInfo, ...props}) {
  return (
    <div className={classes.SignInPage} {...props}>
        <TopBlock pageText='Вход в аккаунт' userInfo={userInfo}/>
        <MainBlock>

        </MainBlock>
        <DownBlock/>
    </div>
  )
}
