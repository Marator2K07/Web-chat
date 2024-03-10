import React from 'react'
import classes from './LoadingBlock.module.css'
import ResponseError from '../Messages/ResponseError/ResponseError'
import BadResponse from '../Messages/BadResponse/BadResponse'
import OkResponse from '../Messages/OkResponse/OkResponse'

export default function LoadingBlock({innerRef,
                                      loading,
                                      holding,
                                      setHolding,
                                      handleNavigate,
                                      error,
                                      responce,
                                      ...props}) {    
    return (
        <div ref={innerRef} className={classes.LoadingBlock} {...props}>   
            {loading ? <div><img src='LoadingIcon.png' alt=''/></div> : ''} 
            {error ? <ResponseError setLoading={setLoading} message={error}/> : ''}    
            {error && <ResponseError setHolding={setHolding} message={error}/>}    
            {
                (() => {
                    if (responce) {
                        switch (responce.data.status) {
                            case 'Ok':
                                return <OkResponse
                                    setHolding={setHolding}
                                    handleNavigate={handleNavigate}
                                    message={responce.data}/>
                            case 'Bad': 
                                return <BadResponse
                                    setHolding={setHolding}
                                    message={responce.data}/>    
                            default:
                                return <p>Что-то пошло не так</p>                                  
                        }
                    }
                })()
            }
        </div>
    )
}
