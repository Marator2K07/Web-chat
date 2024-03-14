import React from 'react'
import classes from './LoadingBlock.module.css'
import ResponseError from '../Messages/ResponseError/ResponseError'
import BadResponse from '../Messages/BadResponse/BadResponse'
import OkResponse from '../Messages/OkResponse/OkResponse'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider'
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider'

export default function LoadingBlock({innerRef,
                                      handleNavigate,
                                      ...props}) {   
    const { loading } = useLoadingContext(); 
    const { response, error } = useResponseHandlerContext();                                      

    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>   
            {
                loading && <Spin
                size='large'
                indicator={<SyncOutlined spin style={{ fontSize: 44, color: "rgb(255, 140, 100)" }}/>}/>
            } 
            {error && <ResponseError message={error}/>}    
            {
                (() => {
                    if (response) {
                        switch (response.data.status) {
                            case 'Ok':
                                return <OkResponse handleNavigate={handleNavigate} message={response.data}/>
                            case 'Bad': 
                                return <BadResponse message={response.data}/>    
                            default:
                                return <p>Что-то пошло не так</p>                                  
                        }
                    }
                })()
            }
        </div>
    )
}
