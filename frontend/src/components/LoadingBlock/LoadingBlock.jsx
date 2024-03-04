import React from 'react'
import classes from './LoadingBlock.module.css'
import Info from '../Messages/Info/Info'
import ResponseError from '../Messages/ResponseError/ResponseError'

export default function LoadingBlock({innerRef,
                                      loading,
                                      errorMsg,
                                      responceMsg,
                                      ...props}) {
    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>   
            {loading ? <img src='LoadingIcon.png' alt=''/> : <p/>}            
            {errorMsg ? <ResponseError message={errorMsg}/> : <p/>}  
            {responceMsg ? <Info message={responceMsg}/> : <p/>}
        </div>
    )
}
