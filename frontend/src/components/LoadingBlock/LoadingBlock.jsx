import React from 'react'
import classes from './LoadingBlock.module.css'
import Info from '../Messages/Info/Info'
import ResponseError from '../Messages/ResponseError/ResponseError'

export default function LoadingBlock({innerRef,
                                      loading,
                                      handleLoading,
                                      error,
                                      responce,
                                      ...props}) {
    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>   
            {loading ? <div className="Image"><img src='LoadingIcon.png' alt=''/></div> : <p/>}            
            {error ? <ResponseError handleLoading={handleLoading} message={error}/> : <p/>}  
            {responce ? <Info message={responce.data}/> : <p/>}
        </div>
    )
}
