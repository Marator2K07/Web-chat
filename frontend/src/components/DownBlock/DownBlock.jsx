import React from 'react'
import classes from './DownBlock.module.css'

export default function DownBlock({...props}) {
  return (
    <div className={classes.DownBlock} {...props}>
        <div className='left'>
            <p>© 2024 Copyright: AwesomeChat.test</p>
        </div>
        <div className='right'>
            Test
        </div>
    </div>
  )
}
