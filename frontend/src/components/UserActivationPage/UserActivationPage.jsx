import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './UserActivationPage.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock'
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ApiUrl = 'http://127.0.0.1:8000/user_activation';

export default function UserActivationPage({...props}) {
    const [responce, setResponce] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    // анализ переданных параметров в url
    const [searchParams] = useSearchParams(); 
    const nodeRef = useRef(null); // для анимации загрузки

    // вызов активации при запуске страницы
    useEffect(() => {        
        handleActivation(); 
    }, []);

    async function handleActivation() {
        var confirmToken = searchParams.get('key');
        
        setLoading(true);
        setResponce(null);
        setError(null);
        await axios.post(ApiUrl, { confirmToken: confirmToken })
        .then(function (response) {
            setResponce(response);
        })
        .catch(function (error) {
            setError(error);
        })
    }

    return (
        <div 
            className={classes.UserActivationPage} {...props}>
            <h3>Активация аккаунта</h3>    
            <CSSTransition 
                in={loading}
                nodeRef={nodeRef}
                timeout={333}
                classNames="LoadingBlock">
                <LoadingBlock 
                    innerRef={nodeRef}
                    loading={loading}
                    setLoading={setLoading}
                    error={error}  
                    responce={responce}/>
            </CSSTransition>
        </div>
    )
}
