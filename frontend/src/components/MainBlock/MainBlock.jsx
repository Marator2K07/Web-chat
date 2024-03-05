import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './MainBlock.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock';
import DynamicComponent from './DynamicMainBlock';

export default function MainBlock({user, 
                                   currentMainBlock,
                                   setCurrentMainBlock,
                                   setHeaderText,
                                   ...props}) {
    const [responce, setResponce] = useState(null);      
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  
    const nodeRef = useRef(null); // для анимации загрузки

    const handleLoading = () => {        
        setLoading(!loading);
    }

    return (
        <div className={classes.MainBlock} {...props}>
            <DynamicComponent 
                component={currentMainBlock}
                user={user}
                setLoading={setLoading}
                setResponce={setResponce}
                setError={setError}/>
            <CSSTransition 
                in={loading}
                nodeRef={nodeRef}
                timeout={333}
                classNames="LoadingBlock">
                <LoadingBlock 
                    innerRef={nodeRef}
                    loading={loading}
                    handleLoading={handleLoading}                             
                    error={error}  
                    responce={responce}/>
            </CSSTransition>
        </div>
    )
}
