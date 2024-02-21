import React from 'react'
import classes from './MyButton.module.css'

const TopBlock = ({children, ...props}) => {
  return (
    <div className={classes.TopBlock} {...props}>
        TopBlock
    </div>
  )
}

export default TopBlock;