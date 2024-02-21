import React from 'react'
import classes from './DownBlock.module.css'

export default function DownBlock({...props}) {
  return (
    <div className={classes.DownBlock} {...props}>
        <p>© 2024 Copyright: AwesomeChat.test</p>
    </div>
  )
}
