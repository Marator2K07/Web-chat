import React from 'react'
import classes from './WelcomeMainBlock.module.css'

const ApiUrl = 'http://127.0.0.1:8000/authorized_user';

export default function WelcomeMainBlock({user,
                                          setLoading,
                                          setResponse,
                                          setError,
                                          setHolding,
                                          ...props}) {
  return (
    <div className={classes.WelcomeMainBlock} {...props}>
        <h3>Успешно зашли в аккаунт</h3>
    </div>
  )
}
