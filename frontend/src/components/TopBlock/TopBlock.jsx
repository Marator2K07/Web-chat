import { React } from 'react'
import classes from './TopBlock.module.css'
import AccountImageButton from './AccountImageButton/AccountImageButton';
import { useNavigationContext } from '../../contexts/NavigationContext/NavigationProvider';

const TopBlock = ({...props}) => {
    const { headerText } = useNavigationContext();

    return (
        <div className={classes.TopBlock} {...props}>
            <div className='left'>
                <p>AwesomeChat</p>
            </div>
            <div className='mid'>
                <p>{headerText}</p>
            </div>
            <div className='right'>            
                <AccountImageButton/>
            </div>             
        </div>
    )
}

export default TopBlock;