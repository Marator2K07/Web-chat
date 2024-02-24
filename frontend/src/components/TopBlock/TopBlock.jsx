import { React } from 'react'
import classes from './TopBlock.module.css'
import AccountImageButton from '../AccountImageButton/AccountImageButton';

const TopBlock = ({pageText, userInfo, ...props}) => {
    if (userInfo.image === null) {
        userInfo.image = "DefUserIcon.png";
    }

    return (
        <div className={classes.TopBlock} {...props}>
            <div className='left'>
                <p>AwesomeChat</p>
            </div>
            <div className='mid'>
                <p>{pageText}</p>
            </div>
            <div className='right'>            
                <AccountImageButton userImg={userInfo.image}/>
            </div>             
        </div>
    )
}

export default TopBlock;