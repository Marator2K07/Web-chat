import React from 'react'
import classes from './LoadingBlock.module.css'
import ResponseError from '../Response/ResponseError/ResponseError'
import OkResponse from '../Response/OkResponse/OkResponse'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider'
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider'
import { LOADING_INDICATOR_COLOR, LOADING_INDICATOR_SIZE } from '../../constants'

export default function LoadingBlock({...props}) {   
    const { loading, holding } = useLoadingContext(); 
    const { response, error } = useResponseHandlerContext();                                      

    const disablePointerEvents = {
        pointerEvents: "none"
    };    
    const enablePointerEvents = {
        pointerEvents: "initial"
    };

    return (
        <div style={loading && holding ? enablePointerEvents
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
                    } />
            } 
            { 
                error && <ResponseError message={error} />
            }
            { 
                response && 
                response.data && 
                <OkResponse message={response.data} />
            }
        </div>
    )
}
