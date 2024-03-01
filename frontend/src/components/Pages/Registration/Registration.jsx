import React, { useState } from 'react'
import axios from 'axios'
import classes from './Registration.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock'
import ResponseErrorBlock from '../../ResponseErrorBlock/ResponseErrorBlock'

const ApiUrl = 'http://127.0.0.1:8000/register';

export default function Registration({userInfo, ...props}) {
    return (
        <div className='all'>
            <TopBlock pageText='Вход в аккаунт' userInfo={userInfo}/>
            <MainBlock>
                <div className={classes.Registration} {...props}>
                    <form>
                        <input
                        type='username'
                        name='username'
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder='Имя аккаунта'/>
                        <input
                        type='email'
                        name='email'
                        value={credentials.email} 
                        onChange={handleChange} 
                        placeholder='Почта аккаунта'/>
                        <input
                        type='password'
                        name='password'
                        value={credentials.password} 
                        onChange={handleChange} 
                        placeholder='Пароль от аккаунта'/>
                        <button type='button' onClick={handleSubmit}>Войти в аккаунт</button>
                    </form>
                    {error === null ? '' : <ResponseErrorBlock responseError={error}/>}   
                </div>                         
            </MainBlock>
            <DownBlock/>
        </div>
    )
}