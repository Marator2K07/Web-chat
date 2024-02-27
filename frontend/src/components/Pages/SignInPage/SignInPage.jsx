import React, { useState } from 'react'
import axios from 'axios'
import classes from './SignInPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock'

const ApiContext = React.createContext('http://localhost:8000/api/signin');

export default function SignInPage({userInfo, ...props}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(ApiContext, {
            username,
            password
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.SignInPage} {...props}>
            <TopBlock pageText='Вход в аккаунт' userInfo={userInfo}/>
            <MainBlock>
                <form onSubmit={handleSubmit}>
                    <input type='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Имя аккаунта'/>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Пароль от аккаунта'/>
                    <button type='submit'>Войти в аккаунт</button>
                </form>
            </MainBlock>
            <DownBlock/>
        </div>
    )
}
