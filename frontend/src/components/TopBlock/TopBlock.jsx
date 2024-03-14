import { React } from 'react'
import classes from './TopBlock.module.css'
import AccountImageButton from './AccountImageButton/AccountImageButton';

const TopBlock = ({headerText, aboutUser, ...props}) => {
    return (
        <div className={classes.TopBlock} {...props}>
            <div className='left'>
                <p>AwesomeChat</p>
            </div>
            <div className='mid'>
                <p>{headerText}</p>
            </div>
            <div className='right'>            
                <AccountImageButton aboutUser={aboutUser}/>
            </div>             
        </div>
    )
}

export default TopBlock;