import React from 'react'
import classes from './LoadingBlock.module.css'
import ResponseError from '../Messages/ResponseError/ResponseError'
import BadResponse from '../Messages/BadResponse/BadResponse'
import OkResponse from '../Messages/OkResponse/OkResponse'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

export default function LoadingBlock({innerRef,
                                      loading,
                                      holding,
                                      setHolding,
                                      handleNavigate,
                                      error,
                                      response,
                                      ...props}) {    
    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>   
            {loading && <Spin
                size='large'
                indicator={<SyncOutlined spin style={{ fontSize: 44, color: "rgb(255, 140, 100)" }}/>}/>
            } 
            {error && <ResponseError setHolding={setHolding} message={error}/>}    
            {
                (() => {
                    if (response) {
                        switch (response.data.status) {
                            case 'Ok':
                                return <OkResponse
                                    setHolding={setHolding}
                                    handleNavigate={handleNavigate}
                                    message={response.data}/>
                            case 'Bad': 
                                return <BadResponse
                                    setHolding={setHolding}
                                    message={response.data}/>    
                            default:
                                return <p>Что-то пошло не так</p>                                  
                        }
                    }
                })()
            }
        </div>
    )
}
