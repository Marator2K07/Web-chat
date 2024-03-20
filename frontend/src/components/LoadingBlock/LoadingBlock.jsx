import React from 'react'
import classes from './LoadingBlock.module.css'
import ResponseError from '../Response/ResponseError/ResponseError'
import OkResponse from '../Response/OkResponse/OkResponse'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider'
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider'
import { SALMON_COLOR } from '../../constants'

export default function LoadingBlock({innerRef,
                                      handleNavigate,
                                      ...props}) {   
    const { loading } = useLoadingContext(); 
    const { response, error } = useResponseHandlerContext();                                      

    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>   
            {
                loading && 
                <Spin
                    size='large'
                    indicator={<SyncOutlined spin style={{ 
                        fontSize: 44, color: SALMON_COLOR
                    }}/>}
                />
            } 
            { error && <ResponseError message={error}/> }
            { 
                response && 
                response.data && 
                <OkResponse
                    handleNavigate={handleNavigate}
                    message={response.data}/>
            }
        </div>
    )
}
