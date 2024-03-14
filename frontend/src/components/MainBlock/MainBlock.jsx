import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './MainBlock.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock';
import DynamicComponent from './DynamicMainBlock';
import { cookies } from '../../contexts/CookieContext';
import { useNavigate } from 'react-router-dom';

// в случае если пользователь уже зашел в аккаунт
const jumpUrl = '/authorized_user';

export default function MainBlock({user, 
                                   handleNavigate, 
                                   currentMainBlock,
                                   ...props}) {
    const [response, setResponse] = useState(null);      
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  
    const [holding, setHolding] = useState(false);
    const nodeRef = useRef(null); // для анимации загрузки    
    const navigate = useNavigate();

    // автоматический плавный переход на страницу аккаунта
    useEffect(() => {    
        let username = cookies.get('username');
        if (username && currentMainBlock === 'login') {
            setHolding(true);
            setLoading(true);
            setTimeout(() => {                
                navigate(`${jumpUrl}/${username}`, { replace: true });                
            }, 1000);
            setTimeout(() => {
                setLoading(false);
                setHolding(false);                
            }, 1500);
        }   
    }, [navigate, currentMainBlock]);    

    return (
        <div className={classes.MainBlock} {...props}>
            <DynamicComponent 
                component={currentMainBlock}
                user={user}
                setLoading={setLoading}
                setResponse={setResponse}
                setError={setError}
                setHolding={setHolding}/>
            <CSSTransition 
                in={holding}
                nodeRef={nodeRef}
                timeout={333}
                classNames="LoadingBlock">
                <LoadingBlock 
                    innerRef={nodeRef}
                    loading={loading}
                    holding={holding}
                    setHolding={setHolding}  
                    handleNavigate={handleNavigate}
                    error={error}  
                    response={response}/>
            </CSSTransition>
        </div>
    )
}
