import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import classes from './MainBlock.module.css'
import LoadingBlock from '../LoadingBlock/LoadingBlock';
import DynamicComponent from './DynamicMainBlock';

export default function MainBlock({user, 
                                   handleNavigate, 
                                   currentMainBlock,
                                   ...props}) {
    const [responce, setResponce] = useState(null);      
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  
    const [holding, setHolding] = useState(false);
    const nodeRef = useRef(null); // для анимации загрузки

    return (
        <div className={classes.MainBlock} {...props}>
            <DynamicComponent 
                component={currentMainBlock}
                user={user}
                setLoading={setLoading}
                setResponce={setResponce}
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
                    responce={responce}/>
            </CSSTransition>
        </div>
    )
}
