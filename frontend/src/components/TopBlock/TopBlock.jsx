import React from 'react'
import classes from './TopBlock.module.css'

const TopBlock = ({pageText, miniAccount, ...props}) => {
  return (
    <div className={classes.TopBlock} {...props}>
        <div className='left'>
            <p>AwesomeChat</p>
        </div>
        <div className='mid'>
            <p>{pageText}</p>
        </div>
        <div className='right'>
            {miniAccount}
        </div>        
    </div>
  )
}

export default TopBlock;