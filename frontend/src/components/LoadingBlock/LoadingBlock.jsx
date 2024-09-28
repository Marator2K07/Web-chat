import React, { useState, useEffect } from 'react'
import classes from './LoadingBlock.module.css'
import ResponseError from '../Response/ResponseError/ResponseError'
import OkResponse from '../Response/OkResponse/OkResponse'
import BadResponse from '../Response/BadResponse/BadResponse'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider'
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider'
import { LOADING_INDICATOR_COLOR, LOADING_INDICATOR_SIZE } from '../../constants'
import { useActionControlContext } from '../../contexts/ActionControlContext/ActionControlProvider'
import AcceptActionForm from '../Form/AcceptActionForm/AcceptActionForm'

export default function LoadingBlock({...props}) {       
    const { loading, holding, toggleHolding } = useLoadingContext(); 
    const { response, error } = useResponseHandlerContext(); 
    const { action, acceptActionForm } = useActionControlContext(); 
    const [showBadResponse, setShowBadResponse] = useState(true);
    const [showError, setShowError] = useState(false);

    const disablePointerEvents = {
        pointerEvents: "none"
    };    
    const enablePointerEvents = {
        pointerEvents: "initial"
    };
    const handleShowError = () => {
        setShowError(!showError);
        setShowBadResponse(!showBadResponse);
    }

    // управление задержкой (holding) экрана загрузки
    useEffect(() => {
        if(!loading && response && response.data) {
            toggleHolding(
                response.data.holding,
                response.data.delay
            );
        }
    }, [loading, response, toggleHolding])

    return (
        <div style={holding ? enablePointerEvents
                            : disablePointerEvents}
            className={classes.LoadingBlock} {...props}>   
            {
                loading && 
                <Spin
                    size='large'
                    indicator={
                        <SyncOutlined spin style={{ 
                            fontSize: LOADING_INDICATOR_SIZE,
                            color: LOADING_INDICATOR_COLOR
                        }} />
                    }
                />
            } 
            {
                acceptActionForm && 
                <AcceptActionForm handleSubmit={action} />
            }
            { 
                showError &&
                error && 
                <ResponseError
                    message={error}
                    showErrorHandler={handleShowError}
                />
            }
            { 
                response && 
                response.data && 
                response.data.status === "Ok" &&
                <OkResponse message={response.data} />
            }
            {
                showBadResponse &&
                response && 
                response.data && 
                response.data.status === "Bad" &&
                <BadResponse 
                    message={response.data}
                    error={error}
                    showErrorHandler={handleShowError}
                />
            }
        </div>
    )
}
