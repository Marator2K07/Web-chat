import { React, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
import classes from './TopBlock.module.css';
import Spacer from '../Helper/Spacer/Spacer';
import { setMenuOffset } from '../../utils';
import AccountImageButton from './AccountImageButton/AccountImageButton';
import { useNavigationContext } from '../../contexts/NavigationContext/NavigationProvider';

const TopBlock = ({ ...props }) => {
    const { currentBlock } = useNavigationContext();
    const [descHeaderWidth, setDescHeaderWidth] = useState(null);
    const descHeaderRef = useRef();

    useEffect(() => {
        setDescHeaderWidth(
            descHeaderRef
                .current
                .getBoundingClientRect()
                .width
        );
    }, [currentBlock]);

    return (
        <div className={classes.TopBlock} {...props}>
            <Spacer
                sizeH='10px'
                sizeW='30px'
            />            
            <div className='left'>
                <p>AwesomeChat</p>
            </div>

            <motion.div
                animate={{ width: descHeaderWidth }}
                onAnimationComplete={() => setMenuOffset('btn', "miniMenu")}
            />
            <div ref={descHeaderRef}>
                <p>{currentBlock.description}</p>
            </div>

            <motion.div animate={{ width: descHeaderWidth + 33 }} />
            <div className='right'>
                <AccountImageButton />
            </div>
            <Spacer
                sizeH='10px'
                sizeW='30px'
            />
        </div>
    )
}

export default TopBlock;