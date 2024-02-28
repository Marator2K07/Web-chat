import React, { useState } from 'react'
import axios from 'axios'
import classes from './SignInPage.module.css'
import TopBlock from '../../TopBlock/TopBlock'
import DownBlock from '../../DownBlock/DownBlock'
import MainBlock from '../../MainBlock/MainBlock'
import ResponseErrorBlock from '../../ResponseErrorBlock/ResponseErrorBlock'

const ApiUrl = 'http://127.0.0.1:8000/signin';

export default function SignInPage({userInfo, ...props}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    async function handleSubmit() {        
        console.log(username);
        console.log(password);

        await axios.post(ApiUrl, {
            username,
            password
        })
        .then(function (response) {
            setResponse(response);
            setError(null);
        })
        .catch(function (error) {
            setError(error);
        })
    };

    return (
        <div className={classes.SignInPage} {...props}>
            <TopBlock pageText='Вход в аккаунт' userInfo={userInfo}/>
            <MainBlock>
                <form onClick={handleSubmit}>
                    <input type='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Имя аккаунта'/>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Пароль от аккаунта'/>
                    <button type='button'>Войти в аккаунт</button>
                </form>
                <h3>{response === null ? '' : response.data}</h3>   
                {error === null ? '' : <ResponseErrorBlock responseError={error}/>}            
            </MainBlock>
            <DownBlock/>
        </div>
    )
}
